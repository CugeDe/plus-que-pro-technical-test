'use client';

import { Form as BsForm, Button, Spinner } from 'react-bootstrap';
import { signIn } from 'next-auth/react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';

import schema from './schema';
import type { FormValues } from './type';

const Form: React.FC = () => {
    const [loading, setLoading] = React.useState(false);
    const methods = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver<FormValues>(schema),
    });
    const { handleSubmit, formState } = methods;
    const { errors } = formState;

    const onSubmit = React.useCallback(async (data: FormValues) => {
        setLoading(true);

        signIn('credentials', data)
            .catch((error) => {
                console.error('[KO] Failed to login with error:', error);
            })
            .finally(() => { setLoading(false); });
    }, []);

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
