<script lang="ts">
  import ProgressBar from './ProgressBar.svelte';
  import { todos } from '$lib/stores/TodoStore';
  import type { Todo } from '$lib/types/Todo';

  export let completePercentage: number = 0;
  export let progressPercentage: number = 0;

  $: totalCount = $todos.length;
  $: completeCount = $todos.filter((todo: Todo) => todo.completed).length;
  $: progressCount = $todos.filter((todo: Todo) => !todo.completed).length;
  $: completePercentage = Math.round((completeCount / totalCount) * 100) || 0;
  $: progressPercentage = Math.round((progressCount / totalCount) * 100) || 0;
</script>

<section class="mt-10">
  <h3 class="text-xl font-bold text-gray-three">Progress</h3>
  <div class="mt-8 space-y-8">
    <ProgressBar title="In Progress" percentage={progressPercentage} />
    <ProgressBar title="Completed" percentage={completePercentage} />
  </div>
</section>
