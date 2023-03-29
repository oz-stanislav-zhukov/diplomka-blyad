<template>
  <div class="page_layout">
    <div class="page_container">
      <div class="page_content">
        <div class="page_content_right">
          <div class="pc_block">
            <div class="pc_block_container">
              <div class="pc_block_post_flexcc">
                <i class="bigico bi bi-hdd"></i>
                <div class="pc_block_text t15500">{{$t('headers.titles.server_error')}}</div>
                <div class="pc_block_text">{{$t('headers.descriptions.server_error')}}</div>
                <div class="page_spacer"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServerUnavailable',
  created(){ this.$PageController.pageSettings('Server Unavailable', false, false, null, 'server_error'); },
  mounted() { this.$PageController.pageMounted(); },
  beforeUnmount() { this.$PageController.pageUnmounted(); }
}
</script>