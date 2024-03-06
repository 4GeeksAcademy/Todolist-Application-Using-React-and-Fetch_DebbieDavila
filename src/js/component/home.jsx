import React, { useState, useEffect } from "react";

export default function Home() {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/_DebbieDavila")
			.then((resp) => resp.json())
			.then((data) => setTodos(data));
	}, []);

	const keyUpHandler = (e) => {
		if (e.key === "Enter") {
			const newTodo = { label: inputValue, done: false };
			const newArray = [...todos, newTodo];
			setTodos(newArray);

			fetch("https://playground.4geeks.com/apis/fake/todos/user/_DebbieDavila", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newArray),
			});

			setInputValue("");
		}
	};

	const handleDelete = (index) => {
		const updatedTodos = todos.filter((todo, i) => i !== index);
		setTodos(updatedTodos);

		fetch("https://playground.4geeks.com/apis/fake/todos/user/_DebbieDavila", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTodos),
		});
	};

	const handleCheck = (index) => {
		const updatedTodos = [...todos];
		updatedTodos[index].done = !updatedTodos[index].done;
		setTodos(updatedTodos);

		fetch("https://playground.4geeks.com/apis/fake/todos/user/_DebbieDavila", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedTodos),
		});
	};

	return (
		<div className="container">
			<h1>My ToDo's</h1>
			<div>
				<input
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					onKeyUp={(e) => keyUpHandler(e)}
					placeholder="What's on the todo today?"
				/>
			</div>

			<ul>
				{todos.map((todo, index) => (
					<li key={index}>
						<input
							className="form-check-input me-1"
							type="checkbox"
							checked={todo.done}
							onChange={() => handleCheck(index)}
						/>
						<label>{todo.label}</label>
						<i
							className="fa-solid fa-trash-can m-5"
							onClick={() => handleDelete(index)}
						>
							delete
						</i>
					</li>
				))}
			</ul>
			<div>{todos.length}</div>
		</div>
	);
}


