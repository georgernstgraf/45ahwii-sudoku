import random
import time
import pyautogui

def list_window_titles():
    windows = pyautogui.getAllWindows()
    return [win.title for win in windows if win.title]  

def select_window(windows):
    print("Verfügbare Fenster:")
    for i, title in enumerate(windows):
        print(f"{i + 1}. {title}")
    
    while True:
        try:
            choice = int(input("Wählen Sie die Nummer des Zielfensters: ")) - 1
            if 0 <= choice < len(windows):
                return windows[choice]
            else:
                print("Ungültige Auswahl. Bitte versuchen Sie es erneut.")
        except ValueError:
            print("Bitte geben Sie eine gültige Zahl ein.")

def main():
    windows = list_window_titles()
    target_window_title = select_window(windows)

    text = input("Geben Sie den Text ein, der simuliert werden soll: ")
    
    print(f"Bitte wechseln Sie manuell zum Fenster '{target_window_title}'.")
    input("Drücken Sie Enter, wenn Sie bereit sind fortzufahren...")
    
    print("Die Eingabe beginnt in 5 Sekunden. Stellen Sie sicher, dass der Cursor im richtigen Eingabefeld ist.")
    time.sleep(5)

    for char in text:
        time.sleep(random.uniform(0.4, 0.6))
        pyautogui.write(char)

    print("Eingabe abgeschlossen!")

if __name__ == "__main__":
    main()