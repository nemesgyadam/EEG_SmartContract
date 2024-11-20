async function main() {
    // const HelloWorld = await ethers.getContractFactory("HelloWorld");
    // const hello_world = await HelloWorld.deploy("Hello World!");
    const UsersInfo = await ethers.getContractFactory("UsersInfo");
    const user_info = await UsersInfo.deploy();
    console.log("Contract Deployed to Address:", user_info.address);
    console.log("Nice")
  }
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  
