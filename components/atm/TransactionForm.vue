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
          <b-form-input v-model="query" type="number" />
        </b-col>
        <b-col>
          <b-button variant="primary" @click="giveOutMoney">
            Give Out
          </b-button>
        </b-col>
      </b-row>
    </b-form-group>
  </b-form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    query: 0
  }),
  computed: {
    ...mapGetters(['BANKNOTES', 'DEFAULT_WITHDRAWAL_VARIANTS'])
  },
  methods: {
    giveOutMoney () {}
  }
}
</script>
