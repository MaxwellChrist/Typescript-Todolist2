let counter: number = 1;

const list = document.getElementById("list") as HTMLUListElement | null;
const listForm = document.querySelector<HTMLFormElement>("#new-task-form");
const listTitle = document.querySelector<HTMLInputElement>("#new-task-title");

type Task = {
  id: number,
  title: string,
  completed: boolean,
  createdAt: Date,
}

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox"
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

listForm?.addEventListener("submit", e => {
  e.preventDefault()
  if (listTitle?.value == "" || listTitle?.value == null) return

  const task: Task = {
    id: counter,
    title: listTitle.value,
    completed: false,
    createdAt: new Date()
  }
  counter++
  addListItem(task) 
})