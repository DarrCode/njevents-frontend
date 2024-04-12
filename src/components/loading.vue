<template>
  <div>
    <VProgressCircular
      class="mx-5 my-5"
      :size="30"
      width="3"
      color="primary"
      indeterminate
    />
    <span>
      Cargando <span class="dot-flashing" />
    </span>
  </div>
</template>

<style>
.dot-flashing {
  margin-left: 4px;
  display: inline-block;
  position: relative;
  width: 2.5px;
  height: 2.5px;
  border-radius: 50%;
  background-color: #0C66E4;
  color: #0C66E4;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}
.dot-flashing::before, .dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}
.dot-flashing::before {
  left: -5px;
  width: 2.5px;
  height: 2.5px;
  border-radius: 50%;
  background-color: #0C66E4;
  color: #0C66E4;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}
.dot-flashing::after {
  left: 5px;
  width: 2.5px;
  height: 2.5px;
  border-radius: 50%;
  background-color: #0C66E4;
  color: #0C66E4;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
    background-color: #0C66E4;
  }
  50%, 100% {
    background-color: rgba(179, 179, 179, 0.959);
  }
}
</style>