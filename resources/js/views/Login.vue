<template>
  <div class="flex min-h-full flex-1">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2
            class="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Sign in to your account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            Not a member?
            {{ " " }}
            <router-link
              to="/register"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Sign up</router-link
            >
          </p>
        </div>
        <div class="mt-10">
          <div>
            <form class="space-y-6" @submit="login">
              <BaseAlert
                v-if="Object.keys(errors).length"
                type="error"
                title="Registration Error"
              >
                <div class="mt-2 text-sm text-red-700">
                  <ul role="list" class="list-disc space-y-1 pl-5">
                    <template v-if="Array.isArray(errors)">
                      <!-- If errors is an array -->
                      <li v-for="(error, index) of errors" :key="index">
                        {{ error }}
                      </li>
                    </template>
                    <template v-else>
                      <!-- If errors is an object -->
                      <div v-for="(field, i) of Object.keys(errors)" :key="i">
                        <div v-for="(error, ind) of errors[field]" :key="ind">
                          <li>{{ error }}</li>
                        </div>
                      </div>
                    </template>
                  </ul>
                </div>
              </BaseAlert>
              <div>
                <BaseInput
                  name="email"
                  v-model="user.email"
                  label="Email"
                  placeholder="email"
                />
              </div>

              <div>
                <BaseInput
                  name="password"
                  type="password"
                  v-model="user.password"
                  label="Password"
                />
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    for="remember-me"
                    class="ml-3 block text-sm leading-6 text-gray-700"
                    >Remember me</label
                  >
                </div>

                <div class="text-sm leading-6">
                  <a
                    href="#"
                    class="font-semibold text-indigo-600 hover:text-indigo-500"
                    >Forgot password?</a
                  >
                </div>
              </div>
              <div>
                <BaseButton
                  type="submit"
                  label="Sign in"
                  :disabled="loading"
                  :loading="loading"
                >
                </BaseButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script setup>
import BaseInput from "@/components/core/BaseInput.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import BaseAlert from "@/components/core/BaseAlert.vue";
import store from "../store/index.js";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const user = {
  email: "",
  password: "",
};
let loading = ref(false);
let errors = ref("");

function login(ev) {
  ev.preventDefault();

  loading.value = true;
  store
    .dispatch("login", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "Dashboard",
      });
    })
    .catch((err) => {
      loading.value = false;
      errors.value = err.response.data.errors || [err.response.data.error];
    });
}
</script>
