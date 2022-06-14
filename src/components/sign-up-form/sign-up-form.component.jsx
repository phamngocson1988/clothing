import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};
const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleSubmit = async event => {
        event.defaultPrevented();
        if (password !== confirmPassword) {
            alert('password do not match');
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user. Email already in use');
            }
            console.error('user creation encountered an error', error);
            
        }
    }
    const handleReset = event => {
        
    }
    const handleChange = event => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }
  return (
    <div>
        <h1>Sign up with your email and password</h1>
        <form onSubmit={handleSubmit}>
            <label>Display Name</label>
            <input required type="text" onChange={handleChange} name="displayName" value={displayName}/>

            <label>Email</label>
            <input required type="email" onChange={handleChange} name="email" value={email}/>

            <label>Password</label>
            <input required type="password" onChange={handleChange} name="password" value={password}/>

            <label>Confirm Password</label>
            <input required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword}/>

            <button type="submit">Sign up</button>
        </form>
    </div>
  );
}

export default SignUpForm;
