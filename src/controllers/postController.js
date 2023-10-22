const router = require("express").Router();

const postManager = require("../managers/postManager");
const { isAuth } = require("../middlewares/authMiddleware");
const { getErrorMessage } = require("../utils/errorHelpers");

router.get("/", async (req, res) => {
  const posts = await postManager.getAll().lean(); 

  res.render("catalog", { posts}); 
});


router.get("/create", (req, res) => {
  res.render("posts/create");
});

router.post("/create", isAuth, async (req, res) => {
  const postData = {
    ...req.body,
    owner: req.user._id,
  };

  try {
    await postManager.create(postData);

    res.redirect("/posts"); // redirects to the catalog page
  } catch (err) {
    res.render("posts/create", { error: getErrorMessage(err) });
  }
});

router.get("/:postId/details", async (req, res) => {
  const postId = req.params.postId;
  const post = await postManager.getOne(postId).lean();
  const isOwner = req.user?._id == post.owner._id; 

  res.render("posts/details", { post, isOwner });
});

router.get("/:postId/delete", isAuth, async (req, res) => {
  const postId = req.params.postId;
  try {
    await postManager.delete(postId);
    res.redirect("/posts"); // redirect to catalog page
  } catch (err) {
    res.render("posts/details", { error: "Unsuccessful deletion!" });
  }
});

router.get("/:postId/edit", isAuth, async (req, res) => {
  const post = await postManager.getOne(req.params.postId).lean();

  res.render("posts/edit", { post });
});

router.post("/:postId/edit", isAuth, async (req, res) => {
  const postId = req.params.postId;
  const postData = req.body;

  try {
    await postManager.edit(postId, postData);

    res.redirect(`/posts/${postId}/details`); 
  } catch (err) {
    res.render("posts/edit", {
      error: "Unable to update posts",
      ...postData,
    }); 
  }
});


// router.get("/search", (req, res) => {
//   res.render("posts/search");
// });

router.get("/search", async (req, res) => {
  const posts = await postManager.getAll().lean(); 

  res.render("catalog-for-search", { posts}); 
});



module.exports = router;