## Blockforms

UNSW Software Engineering Honours Thesis. 

### To run

First, clone the repository
```
$ git clone https://github.com/jasonvooo/thesisB-blockForms.git
```

To run the server (localhost:5000)

```
$ cd thesisB-blockforms/server
$ python3 -m venv env
$ source env/bin/activate
$ pip install -r requirements.txt
$ python block_forms.py
```

To run the client (localhost:3000)

```
$ cd thesisB-blockforms/client
$ cp .env.example .env
$ npm install
$ npm start
```
