<template>
  <div id="form-container">
    <div id="card-front">
      <div id="bank-container">
        <span id="bank-title">BANK CARD</span>
        <span id="bank-amount">{{ $t('bankcard.price') }}: <strong>{{ price }}</strong></span>
      </div>
      <label for="card-number">{{ $t('bankcard.card_number') }}</label>
      <input type="text" id="card-number" v-model="card.number" placeholder="4049 3221 6390 8349" length="16" maxlength="16" />
      <div id="cardholder-container">
        <label for="card-holder">{{ $t('bankcard.card_holder') }}</label>
        <input type="text" id="card-holder" v-model="card.name" placeholder="User name" />
      </div>
      <div id="exp-container">
        <label for="card-exp">{{ $t('bankcard.expiration') }}</label>
        <input id="card-month" @keypress="isNumber" v-model="card.date[0]" type="text" placeholder="MM" length="2" maxlength="2" />
        <input id="card-year" @keypress="isNumber" v-model="card.date[1]" type="text" placeholder="YY" length="2" maxlength="2" />
      </div>
      <div id="cvc-container">
        <label for="card-cvc">CVC/CVV</label>
        <input id="card-cvc" @keypress="isNumber" v-model="card.code" placeholder="XXX-X" type="text" maxlength="4" />
        <p>Last 3 or 4 digits</p>
      </div>
    </div>
    <div id="card-back">
      <div id="card-stripe"></div>
    </div>
  </div>
  <div @click="Pay" class="BankCard_button">{{ $t('bankcard.pay') }}</div>
</template>

<script>
export default {
  name: "BankCard",
  emits: ["Paid", "ErrorMsg"],
  data(){
    return {
      error: '',
      card: {
        number: '',
        name: '',
        date: ['', ''],
        code: '',
      }
    }
  },
  props: {
    price: {
      type: Number,
      default: 0
    },
  },
  methods: {
    isNumber(evt, allow_plus = false) {
      evt = (evt) ? evt : window.event;
      var charCode = (evt.which) ? evt.which : evt.keyCode;
      if(allow_plus && charCode == 43) return true;
      else if((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) evt.preventDefault();
      else return true;
    },
    async Pay(){
      this.Error();
      if(this.card.number.length != 16) return this.Error(this.$t('bankcard.messages.warn_number', [16]));
      else if(this.card.name.length < 4 || this.card.name.length > 16) return this.Error(this.$t('bankcard.messages.warn_name', [4, 50]));
      else if(this.card.code.length < 3 || this.card.code.length > 4) return this.Error(this.$t('bankcard.messages.warn_code', [3, 4]));
      else if(this.card.date[0].length != 2 || this.card.date[1].length != 2) return this.Error(this.$t('bankcard.messages.warn_date'));

      let r = await this.$Api.query('insurance.pay', {}, {
        number: this.card.number,
        name: this.card.name,
        date: `${this.card.date[0]} ${this.card.date[1]}`,
        code: this.card.code,
        price: this.price
      });

      if(r.status == 'error') return this.$router.push(`/error?name=${r.error_name}`);
      else if(r.status == 'success') this.Paid();
    },
    Paid() {
      this.$emit("Paid");
    },
    Error(text = '') {
      this.error = text;
      this.$emit("ErrorMsg", text);
    }
  },
};
</script>

<style lang="scss" scoped>
.BankCard_button{
  color: white;
  cursor: pointer;
  display: flex;
  padding: 0 20px;
  transition: .2s;
  min-height: 40px;
  width: fit-content;
  align-items: center;
  user-select: none;
  border-radius: $button-radius;
  background-color: var(--color-button-primary);
}

.BankCard_button:hover{
  background-color: var(--color-button-primary-hover);
}

#bank-container {
  width: 100%;
  position: relative;
  height: 55px;
  margin-bottom: 5px;
  gap: 5px;
  display: flex;
  flex-direction: column;
}

#bank-title {
  font-size: 20px;
  line-height: 1;
  color: var(--color-primary);
}

#bank-amount {
  font-size: 11px;
}

#bank-amount strong {
  font-size: 12px;
}

#card-back {
  top: 40px;
  right: 0;
  z-index: -2;
}

#form-container {
  margin: 0 auto;
  width: 500px;
  height: 290px;
  position: relative;
  user-select: none;
  
  @media (max-width: 810px) {
    margin: unset;
    width: auto;
    height: auto;
    gap: 10px;
    display: flex;
    flex-direction: column;
  }
}

#card-cvc {
  width: 60px;
  margin-bottom: 0;
}

#card-front,
#card-back {
  position: absolute;
  background-color: var(--color-block);
  width: 390px;
  height: 250px;
  border-radius: 6px;
  padding: 20px 30px 0;
  box-sizing: border-box;
  font-size: 10px;
  letter-spacing: 1px;
  font-weight: 300;
  color: var(--color-text);
  border: 1px solid var(--color-block-border);
  
  @media (max-width: 810px) {
    position: unset;
    width: 100%;
  }
}

#card-back {
  overflow: hidden;
}

#card-month {
  width: 45% !important;
}

#card-number,
#card-holder {
  width: 100%;
}

#card-stripe {
  width: 100%;
  height: 55px;
  background-color: black;
  position: absolute;
  right: 0;
}

#card-year {
  width: 45%;
  float: right;
}

#cardholder-container {
  width: 60%;
  display: inline-block;
}

#cvc-container {
  position: absolute;
  width: 110px;
  right: -115px;
  bottom: -10px;
  padding-left: 20px;
  box-sizing: border-box;
  
  @media (max-width: 810px) {
    position: unset;
    padding-left: unset;
    margin-top: 140px;
  }
}

#cvc-container label {
  width: 100%;
}

#cvc-container p {
  font-size: 6px;
  text-transform: uppercase;
  opacity: 0.6;
  letter-spacing: .5px;
}

#exp-container {
  margin-left: 10px;
  width: 32%;
  display: inline-block;
  float: right;
}

input {
  border: none;
  outline: none;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  margin: 0 0 25px;
  color: white;
  font-size: 10px;
  box-sizing: border-box;
  border-radius: 4px;
  font-family: 'sans-serif';
  letter-spacing: .7px;
  color: var(--color-text);
  background-color: var(--color-block);
  border: 1px solid var(--color-block-border);
}

input::-webkit-input-placeholder {
  color: var(--color-text-selected);
  opacity: 0.7;
  font-family: 'sans-serif';
  letter-spacing: 1px;
  font-weight: 300;
  letter-spacing: 1px;
  font-size: 10px;
}

label {
  display: block;
  margin: 0 auto 7px;
}
</style>