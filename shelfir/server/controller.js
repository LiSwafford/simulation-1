const getInventory = (req, res, next) => {
  req.app
    .get("db")
    .get_inventory()
    .then(response => {
      //   console.log(response);
      res.status(200).json(response);
    })
    .catch(response => {
      //   console.log(response);
      res.status(500).json("err");
    });
};
const createProduct = (req, res, next) => {
  console.log('hit the enpoint "/api/product" ');
  const { name, price, img } = req.body;
  req.app
    .get("db")
    .createProduct([name, price, img])
    .then(response => res.status(200).send(response))
    .catch(error => console.log(error));
};

const deleteProduct = (req, res, next) => {
  console.log("you hit the endpotint /api/product/:id");
  console.log(req.params);
  const { id } = req.params;
  req.app
    .get("db")
    .delete_product([id])
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(error => console.log(error));
};

const updateProduct = (req, res, next) => {
  console.log("updateProduct", req.params, req.body);
  req.app
    .get("db")
    .update_product([
      req.params.id,
      req.body.name,
      req.body.price,
      req.body.img
    ])
    .then(response => {
      console.log(response);
      res.status(200).json(response);
    })
    .catch(response => {
      console.log(response);
      res.status(500).json("err");
    });
};

module.exports = { getInventory, createProduct, deleteProduct, updateProduct };
