<template>
  <div class="card-board">
    <ul class="card-board-lists">
      <li 
        v-for="(card, idx) in props.sortedCards" 
        :key="`card_${idx}`"
        class="card-board-list"
        :class="card.val"
        >
          <button
            type="button" 
            :class="{open: card.open}"
            :data="card.val"
            :open="card.open"
            @click=handleClick($event,idx)
            @transitionstart= trStart()
            @transitionend=checkAnswer($event,idx)
          >
            <span class="hidden">{{ card.val }}</span>
          </button>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref, toRef, type Ref } from 'vue';
const props = defineProps(['timer', 'sortedCards', 'selected', 'isEnd'])
const emit = defineEmits(['winGame'])
const count: Ref<number> = ref(0),
      flag: Ref<boolean> = ref(true),
      sortedCards = toRef(props.sortedCards),
      selected = toRef(props.selected)

function handleClick(e: MouseEvent, idx: number) {
  const cl = e.target.classList
  if(!cl.contains('open')) {
    if(flag.value) {
      if(selected.value.length > 0) {
        if(selected.value[0].index !== idx) {
          sortedCards.value[idx].open = true
          selected.value[count.value] = {index: idx, item: sortedCards.value[idx].val}
          count.value++
        }
      } else {
        sortedCards.value[idx].open = true
        selected.value[count.value] = {index: idx, item: sortedCards.value[idx].val}
        count.value++
      }
    }
  }
}

function trStart() {
  if(count.value > 1) {
    flag.value = false
  }
}

function checkAnswer(e: TransitionEvent, idx: number) {
  let filtered;
  if(count.value > 1) {
    if(selected.value[0].item !== selected.value[1].item) {
      sortedCards.value[selected.value[0].index].open = false
      sortedCards.value[selected.value[1].index].open = false
    }
    selected.value = []
    count.value = 0
    setTimeout(() => {
      flag.value = true
    }, 300)
  }
  filtered = sortedCards.value.filter(f => !f.open)
  if(filtered.length === 0 && props.isEnd) {
    emit('winGame')
  }
}
</script>