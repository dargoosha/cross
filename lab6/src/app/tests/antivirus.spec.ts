import { Antivirus } from "../classes/antivirus";


describe('Antivirus', () => {
  let antivirus: Antivirus;
  const testType = 'av';
  const testId = 'av-001';
  const testName = 'Norton Security';
  const testPrice = 49.99;
  const testDescription = 'Comprehensive antivirus protection';
  const testProtectionLevel = 'Advanced';
  const testSupportedDevices = 5;

  beforeEach(() => {
    antivirus = new Antivirus(
      testType,
      testId,
      testName,
      testPrice,
      testDescription,
      testProtectionLevel,
      testSupportedDevices
    );
  });

  it('should create an instance', () => {
    expect(antivirus).toBeTruthy();
  });

  it('should inherit properties from BaseProduct', () => {
    // Test inherited methods
    expect(antivirus.getId()).toBe(testId);
    expect(antivirus.getName()).toBe(testName);
    expect(antivirus.getPrice()).toBe(testPrice);
    expect(antivirus.getDescription()).toBe(testDescription);
  });


  it('should override getInfo() to include antivirus-specific properties', () => {
    // Test overridden getInfo method
    const info = antivirus.getInfo();
    
    // Basic product info should be included
    expect(info).toContain(`ID: ${testId}`);
    expect(info).toContain(`Name: ${testName}`);
    expect(info).toContain(`Price: $${testPrice}`);
    expect(info).toContain(`Description: ${testDescription}`);
    
    // Antivirus-specific properties should be included
    expect(info).toContain(`Protection Level: ${testProtectionLevel}`);
    expect(info).toContain(`Supported Devices: ${testSupportedDevices}`);
  });

  it('should handle zero price correctly', () => {
    // Test with free product
    const freeAntivirus = new Antivirus(
      'av',
      'av-free',
      'Free Antivirus',
      0,
      'Basic protection for free',
      'Basic',
      1
    );
    
    expect(freeAntivirus.getPrice()).toBe(0);
    expect(freeAntivirus.getInfo()).toContain('Price: $0');
  });

  it('should handle different protection levels', () => {
    // Test with different protection level
    const premiumAntivirus = new Antivirus(
      'av',
      'av-premium',
      'Premium Antivirus',
      99.99,
      'Premium protection',
      'Premium',
      10
    );
    
    expect(premiumAntivirus.getInfo()).toContain('Protection Level: Premium');
  });

  it('should handle large number of supported devices', () => {
    // Test with large number of devices
    const enterpriseAntivirus = new Antivirus(
      'av',
      'av-enterprise',
      'Enterprise Antivirus',
      499.99,
      'Enterprise level protection',
      'Premium',
      100
    );
    
    expect(enterpriseAntivirus.getInfo()).toContain('Supported Devices: 100');
  });
});