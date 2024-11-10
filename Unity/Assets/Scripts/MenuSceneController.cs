using UnityEngine;
using UnityEngine.SceneManagement;
using TMPro;

public class MenuController : MonoBehaviour
{
    public TextMeshProUGUI titleText;
    public GameObject driverButton;
    // public GameObject doctorButton;
    // public GameObject exitButton;

    void Start()
    {
        // Set up the button click listeners
        driverButton.GetComponent<UnityEngine.UI.Button>().onClick.AddListener(OnDriverClick);
        // doctorButton.GetComponent<UnityEngine.UI.Button>().onClick.AddListener(OnDoctorClick);
        // exitButton.GetComponent<UnityEngine.UI.Button>().onClick.AddListener(OnExitClick);
    }

    public void OnDriverClick()
    {
        // Load the next scene (make sure to add the scene to the build settings)
        SceneManager.LoadScene("DriverInstructionsScene");
    }

    public void OnDoctorClick()
    {
        // Open options menu (can be another scene or a pop-up)
        Debug.Log("Options clicked");
    }

    public void OnExitClick()
    {
        // Exit the application
        Application.Quit();
    }
}
