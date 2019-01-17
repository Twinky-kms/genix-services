import { Chain } from "../chain";

const integrationConfig = {
  protocol: "http",
  user: "rpc_user",
  pass: "rpc_password",
  host: "localhost",
  port: 8757
};

describe("Chain", () => {
  const chain = new Chain(integrationConfig);

  it("gets a block by height", async () => {
    const { hash } = await chain.getBlock(1);

    expect(hash).toBe(
      "000000bf3ab765e3f2c75ae426539633e5f94af22b94c7da67652a1d3f6e770b"
    );
  });

  it("gets a block by hash", async () => {
    const { height } = await chain.getBlock(
      "000000bf3ab765e3f2c75ae426539633e5f94af22b94c7da67652a1d3f6e770b"
    );

    expect(height).toBe(1);
  });

  it("gets mining info", async () => {
    const { blocks } = await chain.getMiningInfo();

    expect(blocks).toBeTruthy();
  });
});
