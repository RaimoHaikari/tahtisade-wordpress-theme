import React from 'react';

import {
    Container,
    FormWrap,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    Text,
    Icon
} from "./signinelements"

const SignInForm = () => {
    return (
        <Container>
            <FormWrap>
                <Icon to="/">dolla</Icon>
                <FormContent>
                    <Form>
                        <FormH1>Sing in to your account</FormH1>
                        <FormLabel htmlFor='for'>Email</FormLabel>
                        <FormInput type="email" required />
                        <FormInput type="email" required />
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput type="password" required />
                        <FormButton type="submit">Continue</FormButton>
                        <Text>Forgot password</Text>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    );
};

export default SignInForm;

/*

                        
                        <FormInput type="email" required />
                        <FormLabel htmlFor='for'>Password</FormLabel>
                        <FormInput type="password" required />
                        <FormButton type="submit">Continue</FormButton>
                        <Text>Forgot password</Text>
*/