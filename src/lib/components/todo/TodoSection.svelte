<script lang="ts">
  import TodoInput from '$lib/components/todo/TodoInput.svelte';
  import { todos } from '$lib/stores/TodoStore';
</script>

<section class="mt-8 space-y-4">
  {#each $todos as todo (todo.id)}
    <TodoInput {todo} />
  {/each}
</section>
