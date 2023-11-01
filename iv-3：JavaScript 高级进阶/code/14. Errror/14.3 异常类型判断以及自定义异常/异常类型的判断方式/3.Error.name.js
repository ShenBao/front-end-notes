function testURIError() {
    try {
        decodeURIComponent('%')
      } catch (e) {
        console.log("ErrorName:",e.name === "URIError")  
     
      }
}

testURIError();