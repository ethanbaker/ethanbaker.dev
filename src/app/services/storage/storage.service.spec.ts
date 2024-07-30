import { TestBed } from "@angular/core/testing";

import { StorageService } from "./storage.service";

describe("StorageService", () => {
  let service: StorageService;

  // Run before each test
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageService);
  });

  // Service should be created successfully
  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
