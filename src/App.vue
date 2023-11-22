<template>
  <card-view :opt="{timer: timer, stage: stage}"></card-view>
  <card-board 
    :timer="timer" 
    :sorted-cards="sortedCards" 
    :selected="selected"
    :is-end="isEnd"
    @win-game="winGame()"
    :key="componentKey"  
  />
  <modal-wrap 
    :class="{show: modalOpen}" 
    :win="userWin"
    @next-stage="nextStage()"
    @try-again="resetGame()"
  >
    <template v-slot:modal-text>{{ modalMsg }}</template>
  </modal-wrap>
  <RouterView />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { RouterView } from 'vue-router'
import CardView from './views/CardView.vue'
import CardBoard from './components/CardBoard.vue';
import ModalWrap from './components/ModalWrap.vue';
import { sortArr } from './utils/utils';
import { card } from './utils/cards';
const timer: Ref<number> = ref(60),
      modalOpen: Ref<boolean> = ref(false),
      modalMsg: Ref<string> = ref(''),
      userWin: Ref<boolean> = ref(false),
      stage: Ref<number> = ref(1),
      sortedCards: Ref<object[]> = ref([]),
      componentKey: Ref<number> = ref(0),
      selected: Ref<object[]> = ref([]),
      isEnd: Ref<boolean> = ref(false)
        
let gameIv: any;

const setGame = () => {
  clearInterval(gameIv)
  sortedCards.value = sortArr(card)
  sortedCards.value.forEach(card => {
    card.open = false
  })
  selected.value = []
  sortedCards.value.map((card, idx) => {
    setTimeout(() => {
      card.open = true
    }, 300 * idx)
  })
  setTimeout(() => {
    sortedCards.value.map(card => {
      card.open = false
      isEnd.value = true
    })
    setTimeout(() => {
      gameIv = setInterval(() => {
        timer.value--
        if(timer.value <= 0) {
          looseGame()
          clearInterval(gameIv)
        } 
      },1000)
    })
  }, 300 * 13)
}

const nextStage = () => {
  setGame()
  modalOpen.value = false
  stage.value++
  timer.value = 60 - (stage.value - 1) * 5
  componentKey.value++
}

const resetGame = () => {
  setGame()
  modalOpen.value = false
  stage.value = 1
  timer.value = 60
  componentKey.value++
}

const winGame = () => {
  clearInterval(gameIv)
  isEnd.value = false
  modalOpen.value = true
  modalMsg.value = 'Win Game'
  userWin.value = true
}

const looseGame = () => {
  clearInterval(gameIv)
  isEnd.value = false
  modalOpen.value = true
  modalMsg.value = 'Game Over'
  userWin.value = false
}

setGame()
</script>