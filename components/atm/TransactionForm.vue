<template>
  <b-form @submit.prevent>
    <b-form-group>
      <b-form-radio-group>
        <b-form-radio
          v-for="(variant, i) in DEFAULT_WITHDRAWAL_VARIANTS"
          :key="`variant-${i}`"
          v-model="query"
          name="variant"
          :value="variant"
        >
          {{ variant }}
        </b-form-radio>
      </b-form-radio-group>
    </b-form-group>
    <b-form-group>
      <b-row>
        <b-col>
          <b-form-input v-model="$v.query.$model" :state="!$v.query.$error" type="number" />
        </b-col>
        <b-col>
          <b-button :disabled="$v.query.$error" variant="primary" @click="giveOutMoney">
            Give Out
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { required, minValue, maxValue } from 'vuelidate/lib/validators'
export default {
  data: () => ({
    query: 0
  }),
  computed: {
    ...mapGetters(['BANKNOTES', 'WITHDRAWAL_LIMIT', 'DEFAULT_WITHDRAWAL_VARIANTS'])
  },
  validations () {
    const isMultipleOfTen = this.isMultipleOfTen
    return {
      query: {
        required,
        minValue: minValue(0),
        maxValue: maxValue(this.WITHDRAWAL_LIMIT),
        isMultipleOfTen
      }
    }
  },
  methods: {
    giveOutMoney () {},
    isMultipleOfTen (value) {
      return value % 10 === 0
    }
  }
}
</script>
