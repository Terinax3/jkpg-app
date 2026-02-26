const API_BASE = "http://localhost:3000/api";

const venueList = document.getElementById("venueList");
const sortSelect = document.getElementById("sortSelect");

const form = document.getElementById("venueForm");
const formTitle = document.getElementById("formTitle");
const cancelEditBtn = document.getElementById("cancelEdit");

const venueId = document.getElementById("venueId");
const nameEl = document.getElementById("name");
const categoryEl = document.getElementById("category");
const districtEl = document.getElementById("district");
const websiteEl = document.getElementById("website");

async function fetchVenues() {
  const sort = sortSelect.value;
  const res = await fetch(`${API_BASE}/venues?sort=${encodeURIComponent(sort)}`);
  const data = await res.json();
  renderVenues(data);
}

function renderVenues(venues) {
  venueList.innerHTML = "";
  for (const v of venues) {
    const li = document.createElement("li");
    li.innerHTML = `
  <div class="venues-card">

    <div class="card-image">
      <img class="image" src="img/image.jpg">
    </div>

    <div class="card-info">
      <div class="card-top">
        ${v.website 
          ? `<a href="${escapeAttr(v.website)}" target="_blank" rel="noopener noreferrer">
              <span class="title">${escapeHtml(v.name)}</span>
            </a>`
          : `<span class="title">${escapeHtml(v.name)}</span>`
        }
        <div class="venue-icon-container">
          <img class="icon" src="img/category.svg">
          <span class="category">${escapeHtml(v.category)}</span>
        </div>
      </div>

      <div class="card-bottom">
        <div class="venue-icon-container">
          <img class="icon" src="img/location.svg">
          <span class="district">${escapeHtml(v.district || "")}</span>
        </div>
        <div class="actions">
          <button data-action="edit" data-id="${v.id}" class="special-bttn card-bttn">Edit</button>
          <button data-action="delete" data-id="${v.id}" class="caution card-bttn"><img class="icon" src="img/delete.svg"></button>
        </div>
      </div>
    </div>
  </div>
`;
    venueList.appendChild(li);
  }
}

// Event delegation for edit/delete
venueList.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const id = btn.dataset.id;

  if (action === "delete") {
    await fetch(`${API_BASE}/venues/${id}`, { method: "DELETE" });
    await fetchVenues();
  }

  if (action === "edit") {
    const res = await fetch(`${API_BASE}/venues/${id}`);
    const v = await res.json();
    setEditMode(v);
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: nameEl.value.trim(),
    category: categoryEl.value.trim(),
    district: districtEl.value.trim(),
    website: websiteEl.value.trim(),
  };

  if (!venueId.value) {
    // create
    await fetch(`${API_BASE}/venues`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } else {
    // update
    await fetch(`${API_BASE}/venues/${venueId.value}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  }

  resetForm();
  await fetchVenues();
});

sortSelect.addEventListener("change", fetchVenues);

cancelEditBtn.addEventListener("click", () => {
  resetForm();
});

function setEditMode(v) {
  formTitle.textContent = "Edit venue";
  venueId.value = v.id;
  nameEl.value = v.name || "";
  categoryEl.value = v.category || "";
  districtEl.value = v.district || "";
  websiteEl.value = v.website || "";
}

function resetForm() {
  formTitle.textContent = "Add venue";
  venueId.value = "";
  form.reset();
}

// tiny helpers to avoid injection
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[s]));
}
function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;");
}

fetchVenues();
