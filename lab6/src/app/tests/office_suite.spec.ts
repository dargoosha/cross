import { OfficeSuite } from "../classes/office_suite";

describe('OfficeSuite', () => {
    let officeSuite: OfficeSuite;
    const testType = 'off';
    const testId = 'off-001';
    const testName = 'Microsoft Office 365';
    const testPrice = 99.99;
    const testDescription = 'Complete productivity suite';
    const testIncludedApps = ['Word', 'Excel', 'PowerPoint', 'Outlook'];
    const testIsSubscription = true;
  
    beforeEach(() => {
      // Create a new instance before each test
      officeSuite = new OfficeSuite(
        testType,
        testId,
        testName,
        testPrice,
        testDescription,
        testIncludedApps,
        testIsSubscription
      );
    });
  
    it('should create an instance', () => {
      expect(officeSuite).toBeTruthy();
    });
  
    it('should inherit properties from BaseProduct', () => {
      // Test inherited methods
      expect(officeSuite.getId()).toBe(testId);
      expect(officeSuite.getName()).toBe(testName);
      expect(officeSuite.getPrice()).toBe(testPrice);
      expect(officeSuite.getDescription()).toBe(testDescription);
    });


  
    it('should override getInfo() to include office-specific properties', () => {
      // Test overridden getInfo method
      const info = officeSuite.getInfo();
      
      // Basic product info should be included
      expect(info).toContain(`ID: ${testId}`);
      expect(info).toContain(`Name: ${testName}`);
      expect(info).toContain(`Price: $${testPrice}`);
      expect(info).toContain(`Description: ${testDescription}`);
      
      // Office-specific properties should be included
      expect(info).toContain(`Included Applications: Word, Excel, PowerPoint, Outlook`);
      expect(info).toContain(`Type: Subscription`);
    });
  
    it('should handle one-time purchase office suites', () => {
      // Test with one-time purchase product
      const oneTimeOfficeSuite = new OfficeSuite(
        'off',
        'off-002',
        'Microsoft Office 2021',
        249.99,
        'Standard productivity suite',
        ['Word', 'Excel', 'PowerPoint'],
        false
      );
      
      expect(oneTimeOfficeSuite.getInfo()).toContain('Type: One-time Purchase');
    });
  
    it('should handle different sets of included applications', () => {
      // Test with different apps
      const minimalOfficeSuite = new OfficeSuite(
        'off',
        'off-003',
        'Basic Office',
        49.99,
        'Basic productivity tools',
        ['Word', 'Excel'],
        false
      );
      expect(minimalOfficeSuite.getInfo()).toContain('Included Applications: Word, Excel');
    });
  
    it('should handle empty included applications list', () => {
      // Test with empty apps list
      const emptyAppsSuite = new OfficeSuite(
        'off',
        'off-004',
        'Custom Office',
        19.99,
        'Build your own suite',
        [],
        true
      );
      
      expect(emptyAppsSuite.getInfo()).toContain('Included Applications: ');
    });
  
    it('should handle free office suites', () => {
      // Test with free product
      const freeOfficeSuite = new OfficeSuite(
        'off',
        'off-free',
        'LibreOffice',
        0,
        'Free and open source office suite',
        ['Writer', 'Calc', 'Impress', 'Draw', 'Base'],
        false
      );
      
      expect(freeOfficeSuite.getPrice()).toBe(0);
      expect(freeOfficeSuite.getInfo()).toContain('Price: $0');
      expect(freeOfficeSuite.getInfo()).toContain('Included Applications: Writer, Calc, Impress, Draw, Base');
    });
  });