<template>
    <div class="container">
        <div class="main">
            <div class="header">
                <img src="/img/logo.svg">
                <div style="width: 100%; padding: 20px; text-align: right">Challenge Day #124</div>
            </div>
            <div class="target-ui">
                <div class="target-ui__title">Target UI</div>
                <div class="target-ui__image">
                    <table>
                        <tr>
                            <td class="target-ui__top-left"></td>
                            <td></td>
                            <td class="target-ui__top-right"></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><img src="/img/target-ui.png"></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td class="target-ui__bottom-left"></td>
                            <td></td>
                            <td class="target-ui__bottom-right"></td>
                        </tr>
                        <tr>
                            <td colspan="3" style="text-align: center">550x400 px</td>
                        </tr>
                    </table>
                </div>
                <div class="target-ui__join">
                    <button class="target-ui__join_button">Join Challenge</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kodchasan:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
body, html, #__nuxt {
  margin: 0;
  padding: 0;
    font-family: 'Kodchasan', sans-serif;
    height: 100%;
}

.container {
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.main {
  min-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header {
  width: 100%;
  display: flex;
  margin-bottom: 20px;
}

.target-ui {
  background-color: white;
  border-radius: 16px;
  padding: 30px 20px;

  &__title {
      padding-left: 20px;
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  &__top-left {
    width: 10px;
    height: 10px;
    border-right: grey 1px solid;
    border-bottom: gray 1px solid;
  }

  &__top-right {
    width: 10px;
    height: 10px;
    border-left: grey 1px solid;
    border-bottom: gray 1px solid;
  }

  &__bottom-left {
    width: 10px;
    height: 10px;
    border-right: grey 1px solid;
    border-top: gray 1px solid;

  }

  &__bottom-right {
    width: 10px;
    height: 10px;
    border-left: grey 1px solid;
    border-top: gray 1px solid;
  }
&__join {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    &_button {
        font-size: 16px;
        color: white;
        padding: 10px 20px;
        border-radius: 16px;
        background-color: #696969;
        cursor: pointer;
        outline: none;
        transition: all 0.2s ease-in-out;
        &:hover {
            opacity: 0.8;
        }
        &:active {
            opacity: 0.5;
        }
    }
}

}
</style>
<script setup lang="ts">
useHead({
    title: 'UIbattle.dev'
})
</script>