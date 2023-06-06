<template>
  <div class="InfoCard mw100">
    <div class="InfoCard_title">{{ $t('header.titles.user_help') }}</div>
    <div class="InfoCard_wrapper gap20">
      <div class="InfoCard_text">
        <div class="InfoCard_text_name"><i class="bi bi-info-lg"></i> Купить компьютер, ноутбук или комплектующие для ПК в нашем интернет-магазине очень просто!</div>
      </div>
      <div class="InfoCard_text">
        <div class="InfoCard_text_name">1. Оформление заказа</div>
        <div class="InfoCard_text_data">После выбора товара, нажмите кнопку “купить” - товар появится в корзине. </div>
        <div class="InfoCard_text_data">В разделе «Корзина» будут показаны все товары, которые Вы выбрали.</div>
        <div class="InfoCard_text_data">В корзине Вы можете изменить количество каждого наименования, тогда сайт автоматически пересчитает общую стоимость.</div>
        <div class="InfoCard_text_data">Далее Вам нужно внести свои данные: ФИО получателя, e-mail, адрес доставки, номер телефона, вариант доставки, способ оплаты и т.д</div>
      </div>
      <div class="InfoCard_text">
        <div class="InfoCard_text_name">2. Подтверждение заказа</div>
        <div class="InfoCard_text_data">После внесения всех данных для оформления нажмите кнопку “Оформить заказ”. Сообщение о подтверждении придет к вам на почту.</div>
        <div class="InfoCard_text_data">В течение 1 часа с вами свяжется наш менеджер для уточнения деталей.</div>
      </div>
      <div class="InfoCard_text">
        <div class="InfoCard_text_name">Важно!</div>
        <div class="InfoCard_text_data_sub">При неправильно указанном номере телефона или e-mail адресе мы не сможем увидеть Ваш заказ и подтвердить его.</div>
        <div class="InfoCard_text_data_sub">Не до конца заполненный адрес доставки приведет к дополнительной задержке.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CostumerHelpPage',
  created(){
    this.$PageController.pageSettings('CostumerHelpPage', 'user_help');
  },
}
</script>

<style lang="scss">

</style>