'use client'
import * as React from 'react';
import * as Form from '@radix-ui/react-form';
import { signIn } from 'next-auth/react';
const FormDemo = ({buttonmsg}:{buttonmsg:string}) => {
  const [serverErrors, setServerErrors] = React.useState({
    email: false,
    password: false,
  });
  //注册
  async function submitForm(data: { [k: string]: FormDataEntryValue; }) {
    const {email,password}=data 
    const response = await fetch('api/auth/signin',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    // await console.log(response.json());
    
    if (response.ok) {
      signIn('email', { callbackUrl: '/', },);
    } else {
      console.error('Sign-up failed');
    }
  }

 return  <Form.Root
   onSubmit={(event) => {
    const data = Object.fromEntries(new FormData(event.currentTarget));

    // Submit form data and catch errors in the response
    submitForm(data)
      .then(() => {
        console.log(data);
      })
      /**
       * Map errors from your server response into a structure you'd like to work with.
       * In this case resulting in this object: `{ email: false, password: true }`
       */
      .catch((errors) => setServerErrors({email:false,password:false}))
    // prevent default form submission
    event.preventDefault();
  }}
  onClearServerErrors={() =>
    setServerErrors({ email: false, password: false })
  }
  className="FormRoot gap-2 flex flex-col justify-around text-black w-96  p-10">
    <Form.Field className="FormField " name="email">
      <div 
      className='mb-2'
      style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Form.Label className="FormLabel">Email</Form.Label>
        <Form.Message className="FormMessage text-red-600 text-ellipsis text-xs" match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message className="FormMessage  text-yellow-400 text-ellipsis text-xs" match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input  className="input-form" type="email" required />
      </Form.Control>
    </Form.Field>
    <Form.Field className="FormField" name="question">
      <div className='mb-2' style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <Form.Label className="FormLabel">password</Form.Label>
        <Form.Message className="FormMessage FormMessage text-red-600 text-ellipsis text-xs" match="valueMissing">
          Please enter a password
        </Form.Message>
      </div>
      <Form.Control asChild>
        <input className="input-form" required />
      </Form.Control>
    </Form.Field>
    <Form.Submit asChild>
     
      <button className="but-form w-32" style={{ marginTop: 10 }}>
         {buttonmsg}
      </button>
    </Form.Submit>
  </Form.Root>
};

export default FormDemo;

