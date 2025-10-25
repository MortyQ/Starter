export const mockDataUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    age: 28,
    email: "alice.johnson@example.com",
  },
  { id: 2, name: "Bob Smith", age: 34, email: "bob.smith@example.com" },
  { id: 3, name: "Charlie Brown", age: 22, email: "charlie.brown@example.com" },
  { id: 4, name: "Diana Prince", age: 29, email: "diana.prince@example.com" },
  { id: 5, name: "Edward Norton", age: 41, email: "edward.norton@example.com" },
  { id: 6, name: "Fiona Green", age: 26, email: "fiona.green@example.com" },
  { id: 7, name: "George Miller", age: 38, email: "george.miller@example.com" },
  { id: 8, name: "Hannah White", age: 31, email: "hannah.white@example.com" },
  { id: 9, name: "Ivan Petrov", age: 45, email: "ivan.petrov@example.com" },
  { id: 10, name: "Julia Roberts", age: 27, email: "julia.roberts@example.com" },
  { id: 11, name: "Kevin Lee", age: 33, email: "kevin.lee@example.com" },
  { id: 12, name: "Laura Davis", age: 24, email: "laura.davis@example.com" },
  { id: 13, name: "Michael Chen", age: 36, email: "michael.chen@example.com" },
  { id: 14, name: "Nina Garcia", age: 30, email: "nina.garcia@example.com" },
  { id: 15, name: "Oliver Taylor", age: 42, email: "oliver.taylor@example.com" },
  { id: 16, name: "Patricia Wilson", age: 25, email: "patricia.wilson@example.com" },
  { id: 17, name: "Quinn Anderson", age: 39, email: "quinn.anderson@example.com" },
  { id: 18, name: "Rachel Martinez", age: 32, email: "rachel.martinez@example.com" },
  { id: 19, name: "Samuel Thompson", age: 37, email: "samuel.thompson@example.com" },
  { id: 20, name: "Tina Moore", age: 23, email: "tina.moore@example.com" },
];

// Expandable mock data з nested структурою (1000+ записів)
const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Product",
  "Design",
  "Operations",
  "Legal",
  "Support",
];
const teamTypes: string[] = [
  "Frontend",
  "Backend",
  "DevOps",
  "QA",
  "Mobile",
  "Analytics",
  "Content",
  "Social Media",
  "SEO",
  "PPC",
  "Enterprise",
  "SMB",
  "Retail",
  "B2B",
  "B2C",
  "Talent",
  "Training",
  "Compliance",
  "Benefits",
  "Culture",
  "Accounting",
  "Budgeting",
  "Audit",
  "Treasury",
  "Tax",
];

const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Edward",
  "Fiona",
  "George",
  "Hannah",
  "Ivan",
  "Julia",
  "Kevin",
  "Laura",
  "Michael",
  "Nina",
  "Oliver",
  "Patricia",
  "Quinn",
  "Rachel",
  "Samuel",
  "Tina",
  "Uma",
  "Victor",
  "Wendy",
  "Xavier",
  "Yara",
  "Zack",
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Elijah",
];

const lastNames = [
  "Johnson",
  "Smith",
  "Brown",
  "Prince",
  "Norton",
  "Green",
  "Miller",
  "White",
  "Petrov",
  "Roberts",
  "Lee",
  "Davis",
  "Chen",
  "Garcia",
  "Taylor",
  "Wilson",
  "Anderson",
  "Martinez",
  "Thompson",
  "Moore",
  "Jackson",
  "Martin",
  "Garcia",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Clark",
];

const statuses = [
  "active",
  "pending",
  "inactive",
  "on-hold",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateEmployee(id: number) {
  return {
    id,
    name: `${getRandomItem(firstNames)} ${getRandomItem(lastNames)}`,
    status: getRandomItem(statuses),
    count: 0,
  };
}

function generateTeam(id: number, teamName: string, employeeCount: number) {
  const employees = [];
  const hasChildren = employeeCount > 0 && Math.random() > 0.3; // 70% мають дочірні елементи

  for (let i = 0; i < employeeCount; i++) {
    employees.push(generateEmployee(id * 100 + i + 1));
  }

  return {
    id,
    name: `${teamName} Team`,
    status: getRandomItem(statuses),
    count: employeeCount,
    ...(hasChildren && employees.length > 0 && { children: employees }),
  };
}

function generateDepartment(id: number, deptName: string) {
  const teamCount = getRandomNumber(2, 6);
  const teams: ReturnType<typeof generateTeam>[] = [];
  const hasChildren = Math.random() > 0.2; // 80% департаментів мають команди

  for (let i = 0; i < teamCount; i++) {
    const employeeCount = getRandomNumber(3, 12);
    teams.push(generateTeam(id * 10 + i + 1,
      getRandomItem(teamTypes), employeeCount));
  }

  const totalCount = teams.reduce((sum, team) => sum + team.count, 0);

  return {
    id,
    name: `${deptName} Department`,
    status: getRandomItem(statuses),
    count: totalCount,
    ...(hasChildren && teams.length > 0 && { children: teams }),
  };
}

// Генеруємо 200 департаментів (це дасть ~1000+ записів з вкладеністю)
export const mockDataExpandable = Array.from({ length: 200 }, (_, index) => {
  const deptName = getRandomItem(departments);
  const suffix = index > departments.length - 1 ? ` ${Math.floor(index / departments.length) + 1}` : "";
  return generateDepartment(index + 1, `${deptName}${suffix}`);
});

