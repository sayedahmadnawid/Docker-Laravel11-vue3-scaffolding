<template>
  <div>
    <PageComponent>
      <template v-slot:header>
        <Title :title="$t('general.add_trader')" />
      </template>
      <form @submit.prevent="updateTrader">
        <BaseInput
          type="text"
          :label="$t('general.trader_name')"
          :placeholder="$t('general.trader_name_example')"
          v-model="model.name"
          :error="errors?.name"
        />
        <BaseInput
          type="text"
          :label="$t('general.trader_name_kana')"
          :placeholder="$t('general.trader_name_kana_example')"
          v-model="model.name_kana"
          :error="errors?.name_kana"
        />
        <BaseInput
          type="text"
          :label="$t('general.fax')"
          :placeholder="$t('general.fax_example')"
          v-model="model.fax"
          :error="errors?.fax"
        />
        <BaseInput
          type="input"
          :label="$t('general.phone')"
          :placeholder="$t('general.phone_example')"
          v-model="model.phone"
          :error="errors?.phone"
        />
        <BaseInput
          type="input"
          :label="$t('address.postal_code')"
          :placeholder="$t('address.postal_code_example')"
          v-model="model.postalcode"
          v-on:blur="fetchAddress()"
          :error="errors?.postalcode"
        />
        <BaseInput
          type="input"
          :label="$t('address.prefecture')"
          :placeholder="$t('address.prefecture_example')"
          v-model="model.prefecture"
        />
        <BaseInput
          type="input"
          :label="$t('address.city')"
          :placeholder="$t('address.city_example')"
          v-model="model.city"
        />
        <BaseInput
          type="input"
          :label="$t('address.area')"
          :placeholder="$t('address.area_example')"
          v-model="model.area"
        />
        <BaseInput
          type="street"
          :label="$t('address.street')"
          :placeholder="$t('address.street_example')"
          v-model="model.street"
        />
        <BaseButton>{{ $t("general.submit") }}</BaseButton>
      </form>
    </PageComponent>
  </div>
</template>
<script setup>
import { reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import PageComponent from "@/components/PageComponent.vue";
import Title from "@/components/molecule/Title.vue";
import BaseInput from "@/components/core/BaseInput.vue";
import BaseButton from "@/components/core/BaseButton.vue";
import { Core as YubinBangoCore } from "yubinbango-core2";
import store from "@/store/index.js";

const router = useRouter();
const route = useRoute();
const errors = ref({});
const model = reactive({
  name: "",
  name_kana: "",
  fax: "",
  phone: "",
  postalcode: "",
  prefecture: "",
  city: "",
  area: "",
  street: "",
});

function fetchAddress() {
  new YubinBangoCore(model.postalcode, function (addr) {
    model.prefecture = addr.region;
    model.city = addr.locality;
    model.area = addr.street;
  });
}

if (route.params.id) {
  store.dispatch("traders/getTrader", route.params.id);
}

watch(
  () => store.state.traders.currentTrader.data,
  (newVal, oldVal) => {
    Object.assign(model, JSON.parse(JSON.stringify(newVal)));
  }
);

function updateTrader() {
  store
    .dispatch("traders/updateTrader", { ...model })
    .then(() => {
      store.commit("notify", {
        type: "success",
        title: "Trader Updated!",
        message: "The Trader successfully updated ",
      });
      router.push({
        name: "Traders",
      });
    })
    .catch((error) => {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors;
      }
    });
}
</script>
