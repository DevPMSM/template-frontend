'use server';

import baseApi from '@/services/api';
import { revalidatePath } from 'next/cache';
import { userType } from '@/types/user';

export async function createUser(
  form: FormData,
  token: string,
): Promise<userType> {
  const resp = await baseApi.post('/users', form, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  revalidatePath('/admin/users');

  return resp.data;
}

export async function updateUser(
  formData: FormData,
  token: string,
): Promise<userType> {
  formData.append('_method', 'PATCH');

  const resp = await baseApi.post(
    `/users/${formData.get('id')}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );

  revalidatePath('/admin/users');

  return resp.data;
}

export async function deleteUser(
  id: string,
  token: string,
): Promise<userType> {
  const resp = await baseApi.delete(`/users/${id}`, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });

  revalidatePath('/admin/users');

  return resp.data;
}
