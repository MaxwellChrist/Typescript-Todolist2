let counter: number = 1;

const list = document.getElementById("list") as HTMLUListElement | null;
const listForm = document.querySelector<HTMLFormElement>("#new-task-form");
const listTitle = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

type Task = {
  id: number,
  title: string,
  completed: boolean,
  createdAt: Date,
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
  tasks.push(task)
  saveTasks()
  addListItem(task) 
  counter++
  listTitle.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  list?.append(item)
}

function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const JSONTask = localStorage.getItem("TASKS")
  if (JSONTask == null) return []
  return JSON.parse(JSONTask)
}