import { LockOpen } from '@mui/icons-material';
import { Paper, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router';
import TextInput from '../../app/shared/components/TextInput';
import { useForm } from 'react-hook-form';
import {
  registerSchema,
  RegisterSchema,
} from '../../lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import useAccount from '../../lib/hooks/useAccount';

export default function RegisterForm() {
  const {
    handleSubmit,
    formState: { isValid, isSubmitting },
    control,
    setError,
  } = useForm<RegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema),
  });

  const { registerUser } = useAccount();

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onError: (error) => {
        console.log('error', error);
        if (Array.isArray(error)) {
          error.forEach((err) => {
            if (err.includes('Email')) setError('email', { message: err });
            else if (err.includes('Password'))
              setError('password', { message: err });
          });
        }
      },
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 3,
        maxWidth: 'md',
        mx: 'auto',
        borderRadius: 3,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color="secondary.main"
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Register</Typography>
      </Box>
      <TextInput label="Email" control={control} name="email" />
      <TextInput label="Display name" control={control} name="displayName" />
      <TextInput
        label="Password"
        type="password"
        control={control}
        name="password"
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Register
      </Button>
      <Typography sx={{ textAlign: 'center' }}>
        Already have an account?
        <Typography sx={{ ml: 2 }} component={Link} to="/login" color="primary">
          Sign in
        </Typography>
      </Typography>
    </Paper>
  );
}
