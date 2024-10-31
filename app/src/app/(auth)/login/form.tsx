'use client';

import { Form as BsForm, Button, Spinner } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import * as React from 'react';

import schema from './schema';
import type { FormValues } from './type';
import useSession from '@/security/use-session';

const Form: React.FC = () => {
    const { logIn } = useSession();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const methods = useForm<FormValues>({
        defaultValues: {
            username: '',
            password: '',
        },
        resolver: yupResolver<FormValues>(schema),
    });
    const { handleSubmit, formState } = methods;
    const { errors } = formState;

    const onSubmit = React.useCallback(async (data: FormValues) => {
        setLoading(true);

        logIn(data)
            .then(() => {
                router.push('/administration');
            })
            .catch((error) => {
                console.error('[KO] Failed to login with error:', error);
            })
            .finally(() => { setLoading(false); });
    }, [router, logIn]);

    return (
        <BsForm onSubmit={handleSubmit(onSubmit)}>
            <BsForm.Group className="mb-3" controlId="email">
                <BsForm.Label>Email</BsForm.Label>
                <BsForm.Control type="email" {...methods.register('username')} />
                {errors.username && <BsForm.Text className="text-danger">{errors.username.message}</BsForm.Text>}
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
