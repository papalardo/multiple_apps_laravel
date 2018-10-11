<template lang="html">
    <transition name="fade">
        <div class="css-loader">
            <div class="css-loader-inner">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

.css-loader {
    z-index: 99;
    position: absolute;
    background: rgba(255, 255, 255, 0.85);
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
}

.css-loader-inner {
    position: absolute;
    transform: translateY(-50%);
    top: 50%;
    width: 100%;
    padding: 0 100px;
    text-align: center;
    span {
        background: #44b7dd;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        opacity: 0;
        display:inline-block;
    }
}

@keyframes lol {
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    transform: translateX(0px);
  }
  66% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(300px);
  }
}

@-webkit-keyframes lol {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  66% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(300px);
  }
}

.css-loader-inner span:nth-child(6) {
  -webkit-animation: lol 3s infinite ease-in-out;
  animation: lol 3s infinite ease-in-out;
}

.css-loader-inner span:nth-child(5) {
  -webkit-animation: lol 3s 100ms infinite ease-in-out;
  animation: lol 3s 100ms infinite ease-in-out;
}

.css-loader-inner span:nth-child(4) {
  -webkit-animation: lol 3s 200ms infinite ease-in-out;
  animation: lol 3s 200ms infinite ease-in-out;
}

.css-loader-inner span:nth-child(3) {
  -webkit-animation: lol 3s 300ms infinite ease-in-out;
  animation: lol 3s 300ms infinite ease-in-out;
}

.css-loader-inner span:nth-child(2) {
  -webkit-animation: lol 3s 400ms infinite ease-in-out;
  animation: lol 3s 400ms infinite ease-in-out;
}

.css-loader-inner span:nth-child(1) {
  -webkit-animation: lol 3s 500ms infinite ease-in-out;
  animation: lol 3s 500ms infinite ease-in-out;
}

</style>
