import { v4 as uuidv4 } from 'uuid';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

import type { Todo } from '$lib/types/Todo';

const data = browser
  ? JSON.parse(window.localStorage.getItem('st-todo-list') ?? '[]')
  : [];

export const todos = writable(data);

todos.subscribe((value) => {
  if (browser) {
    localStorage.setItem('st-todo-list', JSON.stringify(value));
  }
});

export const addTodo = () => {
  todos.update((currentTodos) => {
    return [...currentTodos, { id: uuidv4(), text: '', completed: false }];
  });
};

export const deleteTodo = (id: string) => {
  todos.update((currentTodos: Todo[]) => {
    return currentTodos.filter((todo) => todo.id !== id);
  });
};

export const toggleComplete = (id: string) => {
  /*
  todos.update((currentTodos) => {
    return currentTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
  });
  */

  todos.update((currentTodos: Todo[]) => {
    const index = currentTodos.findIndex((todo) => {
      return todo.id === id;
    });
    console.log('index:', index);
    if (index !== -1) {
      const updatedTodo = {
        ...currentTodos[index],
        completed: !currentTodos[index].completed,
      };
      console.log('updatedTodo:', updatedTodo);
      // 새로운 배열을 생성해야 store 갱신이 처리됨
      return [
        ...currentTodos.slice(0, index),
        updatedTodo,
        ...currentTodos.slice(index + 1),
      ];
    }
    return currentTodos;
  });
};

export const editTodo = (id: string, text: string) => {
  todos.update((currentTodos: Todo[]) => {
    return currentTodos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text };
      }
      return todo;
    });
  });
};
