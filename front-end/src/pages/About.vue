<template>
  <Loading v-if="loading" />
  <div v-else class="page_container">
    <div class="page_content">
      <div class="page_content_right">
        <div class="InfoCard mw100">
          <div class="InfoCard_title">{{ $t('info.about') }}</div>
          <div class="InfoCard_wrapper gap20">
            <div class="InfoCard_text">Компания «UNICODE» на рынке уже более 25 лет – наш первый офис в г. Павлодар был открыт в 1996 году.</div>
            <div class="InfoCard_text">«UNICODE» - специализированный магазин компьютерной техники с уникальным опытом в сфере продаж и высококвалифицированным сервисом. </div>
            <div class="InfoCard_text">В нашей команде работают лучшие профессионалы в области розничных и корпоративных продаж, а также имеется свой собственный сервисный центр с квалифицированными инженерами и сборщиками компьютерной техники.</div>
            <div class="InfoCard_text">Уникальная услуга, которую мы предлагаем клиентам нашего интернет-магазина - приобретение компьютерных комплектующих, оргтехники, ноутбуков и периферии под заказ. Если Вы не нашли нужную модель ноутбука в своем городе, то мы решим эту задачу и доставим Ваш заказ в течение 5-7 дней лично в руки! </div>
            <div class="InfoCard_text">Более, чем за 25 лет работы у нас сформировалась надежная связь с поставщиками популярной цифровой техники. Мы работаем только с официальными дилерами мировых брендов: HP, Lenovo, Microsoft, Asus, Dell, Riso, Canon, Toshiba, Acer, APC, SVC, Tripp-Lite, CISCO, Huawei, Zyxel, D-Link, Xerox, Fujitsu.</div>
            <div class="InfoCard_text">Покупая товары у нас, Вы получаете:</div>
            <div class="InfoCard_text">
              <div class="InfoCard_text_name">Качество</div>
              <div class="InfoCard_text_data">Перед доставкой компьютерных товаров наши сотрудники тщательно проверяют технику на работоспособность.</div>
            </div>
            <div class="InfoCard_text">
              <div class="InfoCard_text_name">Техническую поддержку</div>
              <div class="InfoCard_text_data">После покупки, вы можете обращаться в наш сервисный центр, если возникнут неполадки с техникой.</div>
            </div>
            <div class="InfoCard_text">
              <div class="InfoCard_text_name">Гарантию</div>
              <div class="InfoCard_text_data">Официальная гарантия производителя на приобретенный товар от 12 до 36 месяцев.</div>
            </div>
            <div class="InfoCard_text">Благодаря собственному складу, ассортименту и большому количеству товаров, покупать компьютерную технику у нас выгодно Корпоративным клиентам.</div>
            <div class="InfoCard_text">Если Вы только открываете новую фирму или хотите расширить штат сотрудников, и не знаете где выгодно купить мощную компьютерную технику для продуктивной работы вашего персонала, интернет-магазин Unicode.kz предлагает решение! 
            <br>Наши специалисты подберут для Вас лучшие модели, ответят на все вопросы и быстро доставят технику в любую точку Казахстана.</div>
            <div class="InfoCard_text">При заключении договора мы предлагаем Вам СПЕЦПРЕДЛОЖЕНИЕ:</div>
            <div class="InfoCard_text">
              <div class="InfoCard_text_name">Отсрочка платежа</div>
              <div class="InfoCard_text_data">Забирайте товар сейчас, платите потом!</div>
            </div>
            <div class="InfoCard_text">
              <div class="InfoCard_text_name">Специальная цена</div>
              <div class="InfoCard_text_data">Заказав компьютерную технику в большом объеме, мы специально для Вас предоставим индивидуальную скидку!</div>
            </div>
            <div class="InfoCard_text">
              <div class="InfoCard_text_name">Поставка высокотехнологичного оборудования под заказ</div>
            </div>
            <div class="InfoCard_text">
              <div class="InfoCard_text_name">Гарантийное сопровождение</div>
              <div class="InfoCard_text_data">От 12 до 36 месяцев наш сервисный центр будет на связи и поможет вам решить возникшие проблемы.</div>
            </div>
            <div class="InfoCard_text">
              <div class="InfoCard_text_name">Бесплатная доставка по городу Павлодар</div>
            </div>
            <div class="InfoCard_text">В «UNICODE» Вы можете приобрести сертифицированную технику от лидирующих мировых брендов по доступным ценам, с заводской гарантией и последующим сервисным обслуживанием!</div>
          </div>
        </div>
        <div class="InfoCard mt40">
          <div class="InfoCard_title">{{ info.name }}</div>
          <div class="InfoCard_desc"></div>
          
          <div class="InfoCard_wrapper">
            <!--div class="InfoCard_image" style="background-image: url(/engine/assets/img/r1.png); position: absolute;"></div-->
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.supervisor') }}</div>
              <div class="InfoCard_row_data">{{ info.supervisor ?? $t('info.undefined') }}</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.telephone') }}</div>
              <div class="InfoCard_row_data">{{ info.tel ?? $t('info.undefined') }}</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.whatsapp') }}</div>
              <div class="InfoCard_row_data">{{ info.whatsapp ?? $t('info.undefined') }}</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.addr') }}</div>
              <div class="InfoCard_row_data">{{ info.address ?? $t('info.undefined') }}</div>
            </div>
          </div>
        </div>
        <div class="InfoCard mt40">
          <div class="InfoCard_title">{{ $t('info.requisites') }}</div>
          <div class="InfoCard_wrapper">
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.messages.llc') }}</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.bin') }}</div>
              <div class="InfoCard_row_data">010140004463</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.bank') }}</div>
              <div class="InfoCard_row_data">KASPI BANK</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.bik') }}</div>
              <div class="InfoCard_row_data">CASPKZKA</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.iik') }}</div>
              <div class="InfoCard_row_data">KZ73722S000007443181</div>
            </div>
          </div>
        </div>
        <div class="InfoCard mt40">
          <div class="InfoCard_title">{{ $t('info.contacts') }}</div>
          <div class="InfoCard_wrapper">
            <div class="InfoCard_row_i"><i class="bi bi-geo-alt"></i> {{ $t('info.address') }}</div>
            <div class="InfoCard_text">{{ info.address ?? $t('info.undefined') }}</div>
            <div class="InfoCard_row_i mt20"><i class="bi bi-telephone"></i> {{ $t('info.phones') }}</div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.p1') }}</div>
              <div class="InfoCard_row_data">+7 (701) 916 55 05</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.p2') }}</div>
              <div class="InfoCard_row_data">+7 (7182) 32 78 71</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.p3') }}</div>
              <div class="InfoCard_row_data">+7 (7182) 32 77 66</div>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.p4') }}</div>
              <div class="InfoCard_row_data">+7 (7132) 32 50 70, +7 (701) 916 55 10</div>
            </div>
            <div class="InfoCard_row_i mt20"><i class="bi bi-envelope"></i> {{ $t('info.email') }}</div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.e1') }}</div>
              <a class="InfoCard_row_data" href="mailto:sales@unicode.kz">sales@unicode.kz</a>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.e2') }}</div>
              <a class="InfoCard_row_data" href="mailto:n.suvorova@unicode.kz">n.suvorova@unicode.kz</a>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.e3') }}</div>
              <a class="InfoCard_row_data" href="mailto:service@unicode.kz">service@unicode.kz</a>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.e4') }}</div>
              <a class="InfoCard_row_data" href="mailto:vk@unicode.kz">vk@unicode.kz</a>
            </div>
            <div class="InfoCard_row">
              <div class="InfoCard_row_name">{{ $t('info.e5') }}</div>
              <a class="InfoCard_row_data" href="mailto:mm@unicode.kz">mm@unicode.kz</a>
            </div>
          </div>
        </div>
        <div class="InfoCard mt40">
          <div class="InfoCard_title">{{ $t('info.filials') }}</div>
          <div v-for="(filial, i) in filials" :key="`f${i}`" class="InfoCard_desc">{{ filial }}</div>
        </div>
        <!--div class="InfoCard mt40">
          <div class="InfoCard_title">{{ $t('header.titles.rules') }}</div>
        
          <div class="InfoCard_wrapper">
            <div class="InfoCard_row">
              <a href="/rules.docx" target="_blank" class="MainSearch_button">{{ $t('general.download') }}</a>
            </div>
          </div>
        </div-->
        <div class="ReviewCard mt40">
          <div class="ReviewCard_title">{{ $t('info.reviews') }}</div>
          <div v-if="message" class="ReviewCard_message">{{ message }}</div>

          <div v-if="$User.isAuthed()" class="ReviewCard_send">
            <!--input class="ReviewCard_send_input" v-model="review.name" type="text" maxlength="50" :placeholder="$t('info.enter_name')"-->
            <textarea class="ReviewCard_send_textarea" v-model="review.text" type="text" maxlength="255" :placeholder="$t('info.enter_review')"></textarea>
            <div @click="AddReview" class="ReviewCard_send_button">{{ $t('info.send') }}</div>
          </div>

          <div v-if="reviews.length > 0" class="ReviewCard_wrapper">
            <Review v-for="review in reviews" :key="`r${review.id}`" :review="review" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/pages/Loading.vue'
import Review from '@/components/cards/Review.vue'

export default {
  name: 'AboutPage',
  data(){
    return {
      loading: true,
      message: '',
      info: null,
      filials: [],
      reviews: [],
      review: {
        name: '',
        text: ''
      }
    }
  },
  async created(){
    this.$PageController.pageSettings('About', 'about');
    this.loading = true;
    await this.Update();
    this.loading = false;
  },
  methods: {
    async Update(){
      await this.GetCompanyInfo();
      await this.GetReviews();
      this.review.text = '';
      this.review.name = `${this.$user.first_name} ${this.$user.last_name}`;
    },
    async GetCompanyInfo(){
      let r = await this.$Api.query('info.getAbout', {}, { lang: this.$i18n.locale });
      if(r.status == 'server_error' || r.status == 'error' || !r) return this.$router.push('/error');
      this.info = r.response.about;
      this.filials = r.response.filials;
      if(!this.$User.isAuthed()) this.Message(`${this.$t('info.messages.need_auth_review.0')} ${this.$t('info.messages.need_auth_review.1')}`);
    },
    async GetReviews(){
      let r = await this.$Api.query('info.getReviews', {}, { lang: this.$i18n.locale });
      if(r.status == 'server_error' || r.status == 'error' || !r) return this.$router.push('/error');
      this.reviews = r.response.reviews;
    },
    async AddReview(){
      if(this.review.text.length < 2) return this.Message(this.$t('info.enter_review'));
      let r = await this.$Api.query('info.addReview', {}, { name: this.review.name, text: this.review.text });
      if(r.status == 'server_error' || r.status == 'error' || !r) return this.$router.push('/error');
      this.Update();
      this.Message(this.$t('info.messages.moderate_review'));
    },
    GetDate(date){
      let d = new Date(Date.parse(date));
      return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()}`;
    },
    Message(text = ''){
      this.message = text;
    }
  },
  watch: {
    '$i18n.locale'(){
      this.GetCompanyInfo();
    }
  },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); },
  components: {
    Loading,
    Review
  }
}
</script>

<style lang="scss">

</style>