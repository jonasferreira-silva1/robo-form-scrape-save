from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import sqlite3

app = FastAPI()

# Permitir acesso do frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos Pydantic


class Automation(BaseModel):
    id: Optional[int]
    name: str
    description: str
    form_url: str
    execution_mode: str


class Execution(BaseModel):
    id: Optional[int]
    automation_id: int
    status: str
    processed: int
    total: int
    errors: int
    started_at: str
    finished_at: Optional[str]


class Template(BaseModel):
    id: Optional[int]
    name: str
    description: str
    form_url: str
    execution_mode: str


class Schedule(BaseModel):
    id: Optional[int]
    name: str
    automation_id: int
    frequency: str
    time: str
    is_active: bool


class Report(BaseModel):
    id: Optional[int]
    execution_id: int
    summary: str


# Banco de dados SQLite simples (em memória para exemplo)
conn = sqlite3.connect(':memory:', check_same_thread=False)
c = conn.cursor()
c.execute('''CREATE TABLE automations (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, form_url TEXT, execution_mode TEXT)''')
c.execute('''CREATE TABLE executions (id INTEGER PRIMARY KEY AUTOINCREMENT, automation_id INTEGER, status TEXT, processed INTEGER, total INTEGER, errors INTEGER, started_at TEXT, finished_at TEXT)''')
c.execute('''CREATE TABLE templates (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, description TEXT, form_url TEXT, execution_mode TEXT)''')
c.execute('''CREATE TABLE schedules (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, automation_id INTEGER, frequency TEXT, time TEXT, is_active INTEGER)''')
c.execute('''CREATE TABLE reports (id INTEGER PRIMARY KEY AUTOINCREMENT, execution_id INTEGER, summary TEXT)''')
conn.commit()

# Endpoints CRUD básicos


@app.get("/automations", response_model=List[Automation])
def list_automations():
    rows = c.execute("SELECT * FROM automations").fetchall()
    return [Automation(id=row[0], name=row[1], description=row[2], form_url=row[3], execution_mode=row[4]) for row in rows]


@app.post("/automations", response_model=Automation)
def create_automation(automation: Automation):
    c.execute("INSERT INTO automations (name, description, form_url, execution_mode) VALUES (?, ?, ?, ?)",
              (automation.name, automation.description, automation.form_url, automation.execution_mode))
    conn.commit()
    automation.id = c.lastrowid
    return automation


@app.get("/executions", response_model=List[Execution])
def list_executions():
    rows = c.execute("SELECT * FROM executions").fetchall()
    return [Execution(id=row[0], automation_id=row[1], status=row[2], processed=row[3], total=row[4], errors=row[5], started_at=row[6], finished_at=row[7]) for row in rows]


@app.post("/executions", response_model=Execution)
def create_execution(execution: Execution):
    c.execute("INSERT INTO executions (automation_id, status, processed, total, errors, started_at, finished_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
              (execution.automation_id, execution.status, execution.processed, execution.total, execution.errors, execution.started_at, execution.finished_at))
    conn.commit()
    execution.id = c.lastrowid
    return execution


@app.get("/templates", response_model=List[Template])
def list_templates():
    rows = c.execute("SELECT * FROM templates").fetchall()
    return [Template(id=row[0], name=row[1], description=row[2], form_url=row[3], execution_mode=row[4]) for row in rows]


@app.post("/templates", response_model=Template)
def create_template(template: Template):
    c.execute("INSERT INTO templates (name, description, form_url, execution_mode) VALUES (?, ?, ?, ?)",
              (template.name, template.description, template.form_url, template.execution_mode))
    conn.commit()
    template.id = c.lastrowid
    return template


@app.get("/schedules", response_model=List[Schedule])
def list_schedules():
    rows = c.execute("SELECT * FROM schedules").fetchall()
    return [Schedule(id=row[0], name=row[1], automation_id=row[2], frequency=row[3], time=row[4], is_active=bool(row[5])) for row in rows]


@app.post("/schedules", response_model=Schedule)
def create_schedule(schedule: Schedule):
    c.execute("INSERT INTO schedules (name, automation_id, frequency, time, is_active) VALUES (?, ?, ?, ?, ?)",
              (schedule.name, schedule.automation_id, schedule.frequency, schedule.time, int(schedule.is_active)))
    conn.commit()
    schedule.id = c.lastrowid
    return schedule


@app.get("/reports", response_model=List[Report])
def list_reports():
    rows = c.execute("SELECT * FROM reports").fetchall()
    return [Report(id=row[0], execution_id=row[1], summary=row[2]) for row in rows]


@app.post("/reports", response_model=Report)
def create_report(report: Report):
    c.execute("INSERT INTO reports (execution_id, summary) VALUES (?, ?)",
              (report.execution_id, report.summary))
    conn.commit()
    report.id = c.lastrowid
    return report
