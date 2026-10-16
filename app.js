(function () {
  "use strict";

  var STORAGE_KEY = "task-tracker.tasks.v1";

  var form = document.getElementById("task-form");
  var input = document.getElementById("task-input");
  var list = document.getElementById("task-list");
  var count = document.getElementById("count");
  var clearBtn = document.getElementById("clear");

  var tasks = load();

  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      /* storage unavailable (private mode etc.) - app still works in memory */
    }
  }

  function render() {
    list.innerHTML = "";

    if (tasks.length === 0) {
      var empty = document.createElement("li");
      empty.className = "empty";
      empty.textContent = "No tasks yet. Add one above.";
      list.appendChild(empty);
    }

    tasks.forEach(function (task) {
      var li = document.createElement("li");
      if (task.done) li.className = "done";

      var box = document.createElement("input");
      box.type = "checkbox";
      box.checked = task.done;
      box.setAttribute("aria-label", "Mark complete: " + task.text);
      box.addEventListener("change", function () {
        task.done = box.checked;
        save();
        render();
      });

      var label = document.createElement("span");
      label.className = "label";
      label.textContent = task.text; // textContent avoids HTML injection

      var del = document.createElement("button");
      del.type = "button";
      del.className = "delete";
      del.setAttribute("aria-label", "Delete task: " + task.text);
      del.textContent = "×";
      del.addEventListener("click", function () {
        tasks = tasks.filter(function (t) { return t.id !== task.id; });
        save();
        render();
      });

      li.appendChild(box);
      li.appendChild(label);
      li.appendChild(del);
      list.appendChild(li);
    });

    var remaining = tasks.filter(function (t) { return !t.done; }).length;
    count.textContent = remaining + (remaining === 1 ? " task left" : " tasks left");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    tasks.push({ id: Date.now() + Math.random(), text: text, done: false });
    input.value = "";
    save();
    render();
  });

  clearBtn.addEventListener("click", function () {
    tasks = tasks.filter(function (t) { return !t.done; });
    save();
    render();
  });

  render();
})();
