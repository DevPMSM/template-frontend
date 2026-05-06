"use server";

import baseApi from "@/services/api";
import { revalidatePath } from "next/cache";

export async function createUser(
  form: FormData,
  token: string
) {
  try {
    const resp = await baseApi.post("/users", form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/admin/users");
    return resp.data;
  } catch (error: any) {
    const responseData = error.response?.data;
    let errorMessages: string[] = [];

    if (
      responseData?.errors &&
      typeof responseData.errors === "object"
    ) {
      errorMessages = Object.values(
        responseData.errors
      ).flat() as string[];
    } else if (responseData?.message) {
      errorMessages = [responseData.message];
    } else {
      errorMessages = ["Erro ao criar usuário."];
    }
    return { errors: errorMessages };
  }
}

export async function updateUser(
  form: FormData,
  id: string,
  token: string
) {
  form.append("_method", "PUT");

  try {
    const resp = await baseApi.post(`/users/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/admin/users");
    return resp.data;
  } catch (error: any) {
    const responseData = error.response?.data;
    let errorMessages: string[] = [];

    if (
      responseData?.errors &&
      typeof responseData.errors === "object"
    ) {
      errorMessages = Object.values(
        responseData.errors
      ).flat() as string[];
    } else if (responseData?.message) {
      errorMessages = [responseData.message];
    } else {
      errorMessages = ["Erro ao atualizar usuário."];
    }
    return { errors: errorMessages };
  }
}

export async function deleteUser(
  id: string,
  token: string
) {
  try {
    const resp = await baseApi.delete(`/users/${id}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/admin/users");
    return resp.data;
  } catch (error: any) {
    const responseData = error.response?.data;
    let errorMessages: string[] = [];

    if (
      responseData?.errors &&
      typeof responseData.errors === "object"
    ) {
      errorMessages = Object.values(
        responseData.errors
      ).flat() as string[];
    } else if (responseData?.message) {
      errorMessages = [responseData.message];
    } else {
      errorMessages = ["Erro ao deletar usuário."];
    }
    return { errors: errorMessages };
  }
}
