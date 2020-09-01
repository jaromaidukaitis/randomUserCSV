const fetch = require("node-fetch");
const fs = require("fs");
const qtdUsuarios = 20; // quantidade de usuários a serem gerados
const caminho = "./dados"; // caminho do diretório com pasta

const geraDiretorio = fs.stat(caminho, (erro) => {
	if (erro) {
		fs.mkdir(caminho, (erro) => {
			if (erro) {
				throw erro;
			}
		});
	}
});

async function geraUsuarios() {
	const res = await fetch(`http://randomuser.me/api/?results=${qtdUsuarios}`);
	try {
		geraDiretorio;

		if (res.ok) {
			let usuario = await res.json();
			fs.writeFile(
				`${caminho}/listaUsuarios.csv`,
				`first_name, last_name, email, age, gender, username, password\n`,
				(err) => {
					if (err) throw err;
				}
			);

			usuario.results.forEach((usuarioI) =>
				fs.appendFile(
					`${caminho}/listaUsuarios.csv`,
					`${usuarioI.name.first}, ${usuarioI.name.last}, ${usuarioI.email}, ${usuarioI.dob.age}, ${usuarioI.gender}, ${usuarioI.login.username}, ${usuarioI.login.password}\n`,
					(err) => {
						if (err) throw err;
					}
				)
			);

			console.log(`${qtdUsuarios} usuários novos adicionados ao banco`);
		}
	} catch (err) {
		if (err) {
			console.log(`erro: ${err}`);
		}
	}
}

geraUsuarios();
