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
            Register an Account
          </h2>
          <p class="mt-2 text-sm leading-6 text-gray-500">
            I already have account?
            {{ " " }}
            <routerLink
              to="/login"
              class="font-semibold text-indigo-600 hover:text-indigo-500"
              >Sign In</routerLink
            >
          </p>
        </div>
        <div class="mt-10">
          <div>
            <BaseAlert
              v-if="Object.keys(errors).length"
              type="error"
              title="Registration Erorr"
            >
              <div class="mt-2 text-sm text-red-700">
                <ul role="list" class="list-disc space-y-1 pl-5">
                  <div v-for="(field, i) of Object.keys(errors)" :key="i">
                    <div v-for="(error, ind) of errors[field] || []" :key="ind">
                      <li>
                        {{ error }}
                      </li>
                    </div>
                  </div>
                </ul>
              </div>
            </BaseAlert>
            <form @submit="register" class="space-y-6">
              <div>
                <BaseInput
                  name="name"
                  v-model="user.name"
                  label="Name"
                  placeholder="Name"
                />
              </div>
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
              <div>
                <BaseInput
                  name="password_confirmation"
                  v-model="user.password_confirmation"
                  type="password"
                  label="Confirm Password"
                />
              </div>
              <div class="flex items-center justify-between">
                <BaseCheckbox name="remember-me" label="Remember me" />
              </div>
              <div>
                <BaseButton
                  type="submit"
                  label="Register"
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
import { ref } from "vue";
import store from "@/store/index.js";
import { useRouter } from "vue-router";
import BaseInput from "@/components/core/BaseInput.vue";
import BaseCheckbox from "@/components/core/BaseCheckbox.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import BaseAlert from "@/components/core/BaseAlert.vue";
const router = useRouter();
const user = {
  name: "",
  email: "",
  password: "",
};
const loading = ref();
const errors = ref({});

function register(ev) {
  ev.preventDefault();
  loading.value = true;
  store
    .dispatch("register", user)
    .then(() => {
      loading.value = false;
      router.push({
        name: "Dashboard",
      });
    })
    .catch((error) => {
      loading.value = false;
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
}
</script>
