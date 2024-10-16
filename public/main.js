import {
  getProducts,
  addProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "./service.js";

const btnAdd = document.querySelector("#btn-add");
const body = document.querySelector("body");
const tbody = document.querySelector("tbody");

const app = {
  checkLogin: function () {
    const username = localStorage.getItem("username");
    if (username) {
      const header = document.querySelector("#header");
      header.innerHTML = `<h1>Xin chào ${username}!</h1>`;
    }
  },

  renderProduct: async function () {
    const data = await getProducts();

    tbody.innerHTML = data
      ?.map(
        (item, index) => `
        <tr>
            <th scope="row">${index + 1}</th>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.description}</td>
            <td>${item.category}</td>
            <td>
                <button class="btn-delete btn btn-danger" data-id="${
                  item.id
                }">Xóa</button>
                <button class="btn-edit btn btn-warning" data-id="${
                  item.id
                }">Cập nhật</button>
            </td>
        </tr>
    `
      )
      .join("");
    this.handleDelete();
    this.renderUpdate();
  },

  renderAdd: function () {
    btnAdd.addEventListener("click", () => {
      body.innerHTML = `
            <form id="form">
                <div class="mb-3">
                    <label for="name" class="form-label">Tên sản phẩm</label>
                    <input type="text" class="form-control" id="name">
                </div>
                <div class="mb-3">
                    <label for="price">Giá</label>
                    <input type="text" class="form-control" id="price">
                </div>
                <div class="mb-3">
                    <label for="description">Mô tả</label>
                    <input type="text" class="form-control" id="description">
                </div>
                <div class="mb-3">
                    <label for="category">Danh mục</label>
                    <input type="text" class="form-control" id="category">
                </div>
                <button type="submit" class="btn btn-primary">Tạo sản phẩm</button>
            </form>
        `;
      this.handleAdd();
    });
  },

  handleAdd: function () {
    const form = document.querySelector("#form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.querySelector("#name");
      const price = document.querySelector("#price");
      const description = document.querySelector("#description");
      const category = document.querySelector("#category");

      if (!name.value) {
        alert("Không để trống tên sản phẩm");
        name.focus();
        return;
      }

      if (!price.value) {
        alert("Không để trống giá sản phẩm");
        price.focus();
        return;
      }

      const data = {
        name: name.value,
        price: price.value,
        description: description.value,
        category: category.value,
      };
      await addProduct(data);
      alert("Thêm sản phẩm thành công!");
      window.location.reload();
    });
  },

  handleDelete: function () {
    const btnDelete = document.querySelectorAll(".btn-delete");

    btnDelete.forEach((item) => {
      item.addEventListener("click", () => {
        if (confirm("Bạn có chắc chắn muốn xóa không?")) {
          const id = item.dataset.id;
          deleteProduct(id);
          window.location.reload();
        }
      });
    });
  },

  renderUpdate: function () {
    const btnEdit = document.querySelectorAll(".btn-edit");
    btnEdit.forEach((item) => {
      item.addEventListener("click", async () => {
        const id = item.dataset.id;
        const product = await getProductById(id);
        body.innerHTML = `
            <form id="form">
                <div class="mb-3">
                    <label for="name" class="form-label">Tên sản phẩm</label>
                    <input type="text" class="form-control" id="name" value="${product.name}">
                </div>
                <div class="mb-3">
                    <label for="price" class="form-label">Giá sản phẩm</label>
                    <input type="text" class="form-control" id="price" value="${product.price}">
                </div>
                <div class="mb-3">
                    <label for="description" class="form-label">Mô tả sản phẩm</label>
                    <input type="text" class="form-control" id="description" value="${product.description}">
                </div>
                <div class="mb-3">
                    <label for="category" class="form-label">Danh mục sản phẩm</label>
                    <input type="text" class="form-control" id="category" value="${product.category}">
                </div>
                <button type="submit" class="btn btn-primary">Cập nhật</button>
            </form>
        `;
        this.handleUpdate(id);
      });
    });
  },

  handleUpdate: function (id) {
    const form = document.querySelector("#form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.querySelector("#name");
      const price = document.querySelector("#price");
      const description = document.querySelector("#description");
      const category = document.querySelector("#category");

      if (!name.value) {
        alert("Không để trống tên sản phẩm");
        name.focus();
        return;
      }

      if (!price.value) {
        alert("Không để trống giá sản phẩm");
        price.focus();
        return;
      }

      const data = {
        id: id,
        name: name.value,
        price: price.value,
        description: description.value,
        category: category.value,
      };
      await updateProduct(id, data);
      alert("Cập nhật sản phẩm thành công!");
      window.location.reload();
    });
  },

  start: function () {
    this.checkLogin();
    this.renderProduct();
    this.renderAdd();
  },
};

app.start();
