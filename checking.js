// // var string ="<div><img src= \"data:image/jpeg;base64,/9j/4AAQSkZJRgABA\"";
// var string =" <div><img src=\"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQAB\
// 4gIoSUNDX1BST0ZJTEUAAQEAAAIYAAAAAAIQAABtbnRyUkdC\"</div>"
// // var removeimgsrc= string.replace(/"data:image\/[a-z]+;base64,/, "abc");

// // var removeimgsrc= string.replace("data:image\/[a-z]+;base64,\/(?=\/), "abc");
// const removeimgsrc=string.replace(/src="(.*?)"/, '"abc"')
// console.log(removeimgsrc)

// const helloWorld = "Hello World!";
// const hellWrld = helloWorld.replace("o","");
// console.log(hellWrld)

// // const removeimgsrc=string.replace(/src="(.*?)"/, '"abc"')

let el = document.createElement('div');
el.innerHTML = `<p>Here's an image of people:</p><p><br></p><img class="projectImage" src="http://localhost:9199/v0/b/myApp-test.appspot.com/o/images%2Fprojects%2FbqIFfaNFV8SqO3rn0GRH%2Fdraft%2Fpeople-3137672_1920.jpeg?alt=media&amp;token=1369544e-abd0-4b53-a37a-bf325013dcb7" name="people-3137672_1920.jpeg"><p><br></p><p><br></p><p>and here's an image of some dogs:</p><p><br></p><img class="projectImage" src="http://localhost:9199/v0/b/myApp-test.appspot.com/o/images%2Fprojects%2FbqIFfaNFV8SqO3rn0GRH%2Fdraft%2Fdogs.webp?alt=media&amp;token=1c93469a-0537-4a43-9387-13f0bf8d64c9" name="dogs.webp"><p><br></p>`

el.querySelectorAll('img').forEach((imgEl) => {
  imgEl.src = 'my.newSource.com/img/1';
});

console.log(el.innerHTML);



