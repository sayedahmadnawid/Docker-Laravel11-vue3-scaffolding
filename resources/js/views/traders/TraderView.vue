<template>
  <div>
    <PageComponent>
      <template v-slot:header>
        <Title :title="$t('general.add_trader')" />
      </template>
      <BaseInput
        type="text"
        :label="$t('general.trader_name')"
        :placeholder="$t('general.trader_name_example')"
        v-model="form.name"
      />
      <BaseInput
        type="text"
        :label="$t('general.trader_name_kana')"
        :placeholder="$t('general.trader_name_kana_example')"
        v-model="form.name_kana"
      />
      <BaseInput
        type="text"
        :label="$t('general.fax')"
        :placeholder="$t('general.fax_example')"
        v-model="form.fax"
      />
      <BaseInput
        type="input"
        :label="$t('general.phone')"
        :placeholder="$t('general.phone_example')"
        v-model="form.phone"
      />
      <BaseInput
        type="input"
        :label="$t('address.postal_code')"
        :placeholder="$t('address.postal_code_example')"
        v-model="form.postalCode"
        v-on:blur="fetchAddress()"
      />
      <BaseInput
        type="input"
        :label="$t('address.prefecture')"
        :placeholder="$t('address.prefecture_example')"
        v-model="form.prefecture"
      />
      <BaseInput
        type="input"
        :label="$t('address.city')"
        :placeholder="$t('address.city_example')"
        v-model="form.city"
      />
      <BaseInput
        type="input"
        :label="$t('address.area')"
        :placeholder="$t('address.area_example')"
        v-model="form.area"
      />
      <BaseInput
        type="street"
        :label="$t('address.street')"
        :placeholder="$t('address.street_example')"
        v-model="form.street"
      />
    </PageComponent>
  </div>
</template>
<script setup>
import { reactive } from "vue";
import PageComponent from "@/components/PageComponent.vue";
import Title from "@/components/molecule/Title.vue";
import BaseInput from "../../components/core/BaseInput.vue";
import { Core as YubinBangoCore } from "yubinbango-core2";

const form = reactive({
  name: "",
  name_kana: "",
  fax: "",
  phone: "",
  postalCode: "",
  prefecture: "",
  city: "",
  area: "",
  street: "",
});

function fetchAddress() {
  new YubinBangoCore(form.postalCode, function (addr) {
    const address = addr.region + addr.locality + addr.street;
    form.prefecture = addr.region;
    form.city = addr.locality;
    form.area = addr.street;
  });
}
</script>
