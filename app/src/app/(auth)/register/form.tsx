'use client';

import { Form as BsForm, Button, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';

import { register } from './action';
import schema from './schema';
import type { FormValues } from './type';

const Form: React.FC = () => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const methods = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
            passwordConfirmation: '',
            terms: false,
        },
        resolver: yupResolver<FormValues>(schema),
    });
    const { handleSubmit, formState } = methods;
    const { errors } = formState;

    const onSubmit = React.useCallback(async (data: FormValues) => {
        setLoading(true);

        register(data)
            .then((response) => (
                response.status === 'success'
                    ? Promise.resolve(response.data)
                    : Promise.reject(response.data)
            ))
            .then(() => {
                console.debug('[OK] Successfully registered a new account with data:', data);
                router.push('/login');
            })
            .catch((error) => {
                console.error('[KO] Failed to register a new account with data:', data, 'due to:', error);
            })
            .finally(() => { setLoading(false); });
    }, [router]);

    return (
        <BsForm onSubmit={handleSubmit(onSubmit)}>
            <BsForm.Group className="mb-3" controlId="email">
                <BsForm.Label>Email</BsForm.Label>
                <BsForm.Control type="email" {...methods.register('email')} />
                {errors.email && <BsForm.Text className="text-danger">{errors.email.message}</BsForm.Text>}
            </BsForm.Group>
            <BsForm.Group className="mb-3" controlId="password">
                <BsForm.Label>Password</BsForm.Label>
                <BsForm.Control type="password" {...methods.register('password')} />
                {errors.password && <BsForm.Text className="text-danger">{errors.password.message}</BsForm.Text>}
            </BsForm.Group>
            <BsForm.Group className="mb-3" controlId="passwordConfirmation">
                <BsForm.Label>Password Confirmation</BsForm.Label>
                <BsForm.Control type="password" {...methods.register('passwordConfirmation')} />
                {errors.passwordConfirmation && <BsForm.Text className="text-danger">{errors.passwordConfirmation.message}</BsForm.Text>}
            </BsForm.Group>
            <BsForm.Group className="mb-3" controlId="terms">
                <BsForm.Check type="checkbox" label="I agree to the terms and conditions" {...methods.register('terms')} />
                {errors.terms && <BsForm.Text className="text-danger">{errors.terms.message}</BsForm.Text>}
            </BsForm.Group>
            <BsForm.Group controlId="submit" className="text-center d-flex">
                <Button type="submit" id="submit" className="w-100" disabled={loading}>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!loading} className="me-2" />
                    Submit
                </Button>
            </BsForm.Group>
        </BsForm>
    );
}

export default Form;
