import { OperatingSystem } from "../classes/operating_system";

describe('OperatingSystem', () => {
  let operatingSystem: OperatingSystem;
  const testId = 'os-001';
  const testName = 'Windows 11';
  const testPrice = 199.99;
  const testDescription = 'Latest Windows operating system';
  const testVersion = '11.0.22621';
  const testSupportedArchitectures = ['x64', 'ARM64'];

  beforeEach(() => {
    operatingSystem = new OperatingSystem(
      testId,
      testName,
      testPrice,
      testDescription,
      testVersion,
      testSupportedArchitectures
    );
  });

  it('should create an instance', () => {
    expect(operatingSystem).toBeTruthy();
  });

  it('should inherit properties from BaseProduct', () => {
    
    expect(operatingSystem.getId()).toBe(testId);
    expect(operatingSystem.getName()).toBe(testName);
    expect(operatingSystem.getPrice()).toBe(testPrice);
    expect(operatingSystem.getDescription()).toBe(testDescription);
  });

  it('should override getInfo() to include OS-specific properties', () => {
    const info = operatingSystem.getInfo();
    
    expect(info).toContain(`ID: ${testId}`);
    expect(info).toContain(`Name: ${testName}`);
    expect(info).toContain(`Price: $${testPrice}`);
    expect(info).toContain(`Description: ${testDescription}`);
    
    expect(info).toContain(`Version: ${testVersion}`);
    expect(info).toContain(`Supported Architectures: x64, ARM64`);
  });

  it('should handle free operating systems', () => {
    const freeOS = new OperatingSystem(
      'os-free',
      'Ubuntu Linux',
      0,
      'Free and open source operating system',
      '22.04 LTS',
      ['x86', 'x64', 'ARM', 'ARM64']
    );
    
    expect(freeOS.getPrice()).toBe(0);
    expect(freeOS.getInfo()).toContain('Price: $0');
    expect(freeOS.getInfo()).toContain('Version: 22.04 LTS');
    expect(freeOS.getInfo()).toContain('Supported Architectures: x86, x64, ARM, ARM64');
  });

  it('should handle different versions', () => {
    const legacyOS = new OperatingSystem(
      'os-002',
      'Windows 10',
      139.99,
      'Older Windows operating system',
      '10.0.19044',
      ['x86', 'x64']
    );
    
    expect(legacyOS.getInfo()).toContain('Version: 10.0.19044');
  });

  it('should handle different sets of supported architectures', () => {
    const macOS = new OperatingSystem(
      'os-003',
      'macOS Ventura',
      129.99,
      'Apple operating system',
      '13.3.1',
      ['x64', 'ARM64']
    );
    
    expect(macOS.getInfo()).toContain('Supported Architectures: x64, ARM64');
  });

  it('should handle empty supported architectures list', () => {
    // Test with empty architectures list
    const customOS = new OperatingSystem(
      'os-004',
      'Custom OS',
      49.99,
      'Experimental operating system',
      '0.1.0',
      []
    );
    
    expect(customOS.getInfo()).toContain('Supported Architectures: ');
  });
});