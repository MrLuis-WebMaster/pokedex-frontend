<script setup lang="ts">
import { Form, Field, ErrorMessage, FormActions } from "vee-validate";
import { useMutation } from "@tanstack/vue-query";
import * as yup from "yup";
import { useAuthStore } from "../../store/auth.store";
import { UserCredentials } from "../../types/auth.types";
import { getToken } from "../../services/auth.services";

const { saveSession } = useAuthStore();
const handleMutationToken = useMutation({
  mutationFn: getToken,
});
const { isPending } = handleMutationToken;
const schema = yup.object({
  email: yup.string().required().email(),
  name: yup.string().required().min(4).max(50),
});

const submit = async (
  data: any,
  { resetForm }: FormActions<{ email: string; name: string }>,
) => {
  const credentials = data as UserCredentials;
  const token = await handleMutationToken.mutateAsync(credentials);
  saveSession(token || null);
  resetForm();
};
</script>

<template>
  <div class="max-w-md mx-auto my-8 font-medium">
    <h4 class="mb-4">
      Please enter a name and email to give us permission to view the data
    </h4>
    <Form :validation-schema="schema" @submit="submit">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 text-sm font-bold mb-2"
          >Name</label
        >
        <Field
          id="name"
          name="name"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ErrorMessage name="name" class="text-red-500 text-xs italic" />
      </div>
      <div class="mb-6">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
          >Email</label
        >
        <Field
          id="email"
          name="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <ErrorMessage name="email" class="text-red-500 text-xs italic" />
      </div>
      <div class="flex items-center justify-between">
        <button
          type="submit"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full :disabled:cursor-not-allowed"
          :disabled="Boolean(isPending)"
        >
          {{ isPending ? "Loading..." : "Submit" }}
        </button>
      </div>
    </Form>
  </div>
</template>
