import { useState } from "react";
import "./Post.css";

function Post() {
    const [postType, setPostType] = useState("Question");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [abstractText, setAbstractText] = useState("");
    const [articleText, setArticleText] = useState("");
    const [tags, setTags] = useState("");

    const handlePost = (event) => {
        event.preventDefault();

        const tagList = tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean);

        if (!title.trim()) {
            alert("Please enter a title.");
            return;
        }

        if (postType === "Question" && !description.trim()) {
            alert("Please describe your problem.");
            return;
        }

        if (postType === "Article" && !abstractText.trim()) {
            alert("Please enter an abstract.");
            return;
        }

        if (postType === "Article" && !articleText.trim()) {
            alert("Please enter the article text.");
            return;
        }

        if (tagList.length > 3) {
            alert("Please enter no more than 3 tags.");
            return;
        }

        if (tagList.some((tag) => tag.length > 30)) {
            alert("Each tag must be 30 characters or fewer.");
            return;
        }

        alert("Your post has been submitted successfully!");
    };

    return (
        <main className="post-page">
            <h2 className="post-section-heading">New Post</h2>

            <form onSubmit={handlePost} noValidate>
                <div className="post-type-row">
                    <span>Select Post Type:</span>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            value="Question"
                            checked={postType === "Question"}
                            onChange={() => setPostType("Question")}
                        />
                        Question
                    </label>

                    <label>
                        <input
                            type="radio"
                            name="postType"
                            value="Article"
                            checked={postType === "Article"}
                            onChange={() => setPostType("Article")}
                        />
                        Article
                    </label>
                </div>

                <h2 className="post-section-heading">
                    What do you want to ask or share
                </h2>

                <p className="post-help-text">
                    This section changes depending on the selected post type.
                </p>

                <div className="post-form-row">
                    <label htmlFor="post-title">Title</label>
                    <input
                        id="post-title"
                        type="text"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        placeholder={
                            postType === "Question"
                                ? "Start your question with how, what, why, etc."
                                : "Enter a descriptive title"
                        }
                        maxLength={150}
                        required
                    />
                </div>

                {postType === "Question" ? (
                    <div className="post-form-row post-description-row">
                        <label htmlFor="post-description">
                            Describe your problem
                        </label>
                        <textarea
                            id="post-description"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            rows={9}
                            maxLength={5000}
                            required
                        />
                    </div>
                ) : (
                    <>
                        <div className="post-form-row">
                            <label htmlFor="post-abstract">Abstract</label>
                            <textarea
                                id="post-abstract"
                                value={abstractText}
                                onChange={(event) => setAbstractText(event.target.value)}
                                placeholder="Enter a 1-paragraph abstract"
                                rows={3}
                                maxLength={1000}
                                required
                            />
                        </div>

                        <div className="post-form-row">
                            <label htmlFor="post-article-text">Article Text</label>
                            <textarea
                                id="post-article-text"
                                value={articleText}
                                onChange={(event) => setArticleText(event.target.value)}
                                placeholder="Enter your article text"
                                rows={7}
                                maxLength={10000}
                                required
                            />
                        </div>
                    </>
                )}

                <div className="post-form-row post-tags-row">
                    <label htmlFor="post-tags">Tags</label>
                    <input
                        id="post-tags"
                        type="text"
                        value={tags}
                        onChange={(event) => setTags(event.target.value)}
                        placeholder="Add up to 3 tags, separated by commas, e.g., Java, React"
                    />
                </div>

                <button className="post-submit-button" type="submit">
                    Post
                </button>
            </form>
        </main>
    );
}

export default Post;
