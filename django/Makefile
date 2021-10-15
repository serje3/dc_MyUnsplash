run:
	docker run -p "8000:8000" -it -v $(pwd):/code --name "unsplash_container" --rm serje3/unsplash:dev
build:
	docker build . --rm -t serje3/unsplash:dev
