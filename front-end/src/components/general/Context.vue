<template>
  <div class="context_screen" :class="OpennedContextScreen" @click="CloseMenu(false)" :style="GetStyle">
    <div class="context_menu" :class="OpennedContextMenu">
      <div class="page_pmenu_wrap">
        <ol id="ProfileMenu" class="page_mitem_content">

          <template v-for="(item, index) in menu" :key="item.name">
						<div v-if="item.separator" class="page_separator"></div>
						<template v-else-if="!item.disabled && item.user">
							<template v-if="!$vm.isMobile()">
								<li class="page_minimenu_container">
									<a v-if="item.href" :href="item.href" class="context_menu_link profile">
										<img v-if="item.avatar" class="page_mitem_image" :src="item.avatar">
										<div v-else class="page_mitem_image seload"></div>
										<div class="page_mitem_text">
											<p v-if="!item.first_name" class="page_mitem_title primary seloadtext seloadpanel">.</p>
											<p v-else class="page_mitem_title primary">{{item.first_name}} {{item.last_name}}</p>
											<p class="page_mitem_title text_mini">{{item.text}}</p>
										</div>
									</a>
									<router-link v-if="item.to" :to="item.to" class="context_menu_link profile">
										<img v-if="item.avatar" class="page_mitem_image" :src="item.avatar">
										<div v-else class="page_mitem_image seload"></div>
										<div class="page_mitem_text">
											<p v-if="!item.first_name" class="page_mitem_title primary seloadtext seloadpanel">.</p>
											<p v-else class="page_mitem_title primary">{{item.first_name}} {{item.last_name}}</p>
											<p class="page_mitem_title text_mini">{{item.text}}</p>
										</div>
									</router-link>
								</li>
								<div class="page_separator"></div>
							</template>
						</template>
						<li v-else-if="!item.disabled" class="page_minimenu_container">
							<a v-if="item.event" :key="`b${index}`" @click="clickContext(item)" class="context_menu_link" :class="{'active': selected == item.event}">
								<span v-if="item.ico" class="page_mitem_icon"> <i :class="item.ico" :style="item.ico_color ? `color: ${item.ico_color};` : ''"></i> </span>
								<p class="page_mitem_title">{{item.name}}</p>
								<CheckBox v-if="(typeof item.checked != 'undefined')" title="" name="rounded_menu" :disabled="item.check_disabled" :selected="item.checked" />
							</a>
							<router-link v-else-if="item.to" :key="`l${index}`" :to="`${item.to}`" class="context_menu_link" :class="{'active': selected == item.select}">
								<span v-if="item.ico" class="page_mitem_icon"> <i :class="item.ico" :style="item.ico_color ? `color: ${item.ico_color};` : ''"></i> </span>
								<p class="page_mitem_title">{{item.name}}</p>
							</router-link>
							<a v-else-if="item.href" :href="item.href" target="_blank" class="context_menu_link">
								<span v-if="!item.ico && !item.noico" class="page_mitem_icon"> <i class="bi bi-box-arrow-up-right"></i> </span>
								<span v-else-if="item.ico" class="page_mitem_icon"> <i :class="item.ico" :style="item.ico_color ? `color: ${item.ico_color};` : ''"></i> </span>
								<p class="page_mitem_title">{{item.name}}</p>
							</a>
							<a v-else @click="$Debug.alert('Ошибка настройки', `Добавьте { event: 'name' } для калбека\nИли { href/to: 'link' } для перехода на другую страницу`)" :key="`e${index}`" class="page_minimenu_link">
								<span class="page_mitem_icon"> <i class="bi bi-x-lg"></i> </span>
								<p class="page_mitem_title">Click me!</p>
							</a>
						</li>
					</template>
					<template v-if="!autoclose">
						<div class="page_separator"></div>
						<li class="page_minimenu_container">
							<a @click="CloseMenu(true)" class="context_menu_link">
								<span class="page_mitem_icon"><i class="bi bi-x-lg" style="color: red;"></i></span>
								<p class="page_mitem_title">{{$t('general.close')}}</p>
							</a>
						</li>
					</template>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import { watch } from 'vue'
import CheckBox from '@/components/controls/CheckBox.vue'

export default {
  name: 'ContextMenu',
  data(){
    const context_active = this.$state.site.context_id;

    watch(() => this.$state.site.context_id, (value) => {
      this.context_active = value;
    });

    return {
      context_active,
      pmenu_none: true,
			pmenu_animation: true
    }
  },
  props: {
    id: {
      type: String,
      default: "context-1"
    },
    myclass: {
      type: String,
      default: ""
    },
    gap: {
      type: String,
      default: "5"
    },
    menu: {
      type: Object,
      default: null
    },
    mini: {
      type: Boolean,
      default: false
    },
    autoclose: {
      type: Boolean,
      default: true
    },
    selected: {
      type: String,
      default: ''
    }
  },
  watch: {
    context_active: 'ToggleContextMenu'
  },
  methods: {
    CloseMenu: function (force = false){
      if(this.autoclose || force) this.$state.site.context_id = !this.$state.site.context_id;
    },
    clickContext: function (item){
			if(typeof item.checked != 'undefined'){
				if(item.check_disabled) return;
				item.checked = !item.checked;
				this.$emit('ContextClick', item.event, item.checked);
				return;
			}
			
			this.$emit('ContextClick', item.event);
		},
    ToggleContextMenu: function(){
			if(this.interval) return;
			if(this.context_active != this.id){
				this.pmenu_animation = true;
				this.pmenu_none = false;
        
				if(!this.interval) this.interval = setInterval(() => {
					this.pmenu_none = true;
					this.pmenu_animation = false;
					clearInterval(this.interval);
          this.interval = null;
				}, this.$vm.isMobile() ? 200 : 50);
			} else {
				this.pmenu_none = false;
				this.pmenu_animation = true;

				if(!this.interval) this.interval = setInterval(() => {
					this.pmenu_none = false;
					this.pmenu_animation = false;
					clearInterval(this.interval);
          this.interval = null;
				}, 1);
			}
    }
  },
  computed: {
    OpennedContextScreen() {
			let cls;
      if(this.mini && this.$vm.isDesktop()) cls = 'mini';
      if(this.pmenu_none) cls += ' pnone';
			else if(this.pmenu_animation) cls += '';
      else cls += this.context_active == this.id ? ' pactive' : '';
			return cls;
    },
		OpennedContextMenu() {
      if(this.pmenu_none) return `pnone ${this.myclass}`;
			if(this.pmenu_animation) return this.myclass;
      return this.context_active == this.id ? `pactive ${this.myclass}` : this.myclass;
    },
		GetStyle(){
			return `margin-left: -${this.gap}px;`;
		}
  },
	components: {
		CheckBox
	}
}
</script>

<style lang="scss" scoped>
</style>